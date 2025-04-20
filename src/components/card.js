import { removeLike, addLike } from "./api";

//Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback, pofileId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    const isLiked = cardData.likes.some((like) => like._id === pofileId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id !== pofileId) {
        deleteButton.classList.add("card__delete-button-inactive");
    } else {
        deleteButton.addEventListener('click', (event) => (deleteCallback(event, cardData._id)));
    }
    likeButton.addEventListener('click', (event) => likeCallback(event, cardData._id));
    cardImage.addEventListener('click', imageClickCallback);
    return cardElement;
}
//Функция удаления карточки
export function deleteCardUi(cardElement) {
    cardElement.remove();
}

function updateLikeCount(likeButton, likes) {
    const likeCount = likeButton.closest('.card__description').querySelector('.card__like-count');
    likeCount.textContent = likes.length;
}

// Функция переключения лайка
export async function toggleLike(event, cardId) {
    const likeButton = event.target;
    try {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            const card = await removeLike(cardId);
            likeButton.classList.remove('card__like-button_is-active');
            updateLikeCount(likeButton, card.likes)
        } else {
            const card = await addLike(cardId);
            likeButton.classList.add('card__like-button_is-active');
            updateLikeCount(likeButton, card.likes);
        }
    } catch (err) {
        console.error(err);
    }
}