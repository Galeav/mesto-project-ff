const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: "67f1673b-243c-4676-827e-0d8f4b804e1d",
        'Content-Type': 'application/json'
    }
}

async function getData(url, methodName = 'GET', body = null) {
    const res = await fetch(url, {
        method: methodName,
        headers: config.headers,
        body: body
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Ошибка: ${res.status}`);
    }

}

export async function getInitialCards() {
    return await getData(`${config.baseUrl}/cards`);
}

export async function getUser() {
    return await getData(`${config.baseUrl}/users/me`);
}

export async function editProfile(name, about) {
    return await getData(`${config.baseUrl}/users/me`, 'PATCH', JSON.stringify({
        name: name,
        about: about
    }));
}

export async function addCard(name, link) {
    return await getData(`${config.baseUrl}/cards`, 'POST', JSON.stringify({
        name: name,
        link: link
    }));
}

export async function deleteCard(cardId) {
    return await getData(`${config.baseUrl}/cards/${cardId}`, 'DELETE')
}

export async function addLike(cardId) {
    return await getData(`${config.baseUrl}/cards/likes/${cardId}`, 'PUT');
}

export async function removeLike(cardId) {
    return await getData(`${config.baseUrl}/cards/likes/${cardId}`, 'DELETE');
}

export async function updateAvatar(avatarUrl) {
    return await getData(`${config.baseUrl}/users/me/avatar`, 'PATCH', JSON.stringify({
        avatar: avatarUrl
    }));
}