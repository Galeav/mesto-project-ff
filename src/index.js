import { initialCards } from './scripts/cards.js';
import './pages/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template");
//Контейнер для размещения карточек
const list = document.querySelector(".places__list");
// @todo: DOM узлы


// @todo: Функция создания карточки
function createCard (nameCard, linkCard, delCard) {
    const card = cardTemplate.content.cloneNode(true);
    const deleteButton = card.querySelector(".card__delete-button");
    const cardImage = card.querySelector(".card__image");

    cardImage.src = linkCard;
    cardImage.alt = "Фото " + nameCard;
    card.querySelector(".card__title").textContent = nameCard;

    delCard(deleteButton);

    return card;
}

// @todo: Функция удаления карточки
function deleteCard (delButton) {
    delButton.addEventListener('click', function(evt) {
        evt.target.closest('.places__item').remove();
    });
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    console.log(element)
    list.append(createCard(element.name, element.link, deleteCard));

});
