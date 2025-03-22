// Создаём карточку
export function createCard(cardData, deleteCallback, likeCallback, imageClickCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement= cardTemplate.querySelector(".card").cloneNode(true); 

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', deleteCallback);
    likeButton.addEventListener('click', likeCallback);
    cardImage.addEventListener('click', imageClickCallback);
    return cardElement;
}
// Удаляем карточку
export function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}

// Переключаем лайк
export function toggleLike(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active');
}