import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
// @todo: Темплейт карточки

//DOM узлы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const DescriptionInput = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imagePopupCaption = document.querySelector('.popup__caption');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const imagePopupImg = document.querySelector('.popup__image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const profileEditPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');




// Выводим карточку на страницу
for (const cardData of initialCards) {
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
    placesList.appendChild(cardElement);
}

// Навешиваем обработчики для открытия popUp
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    DescriptionInput.value = profileDescription.textContent;
    openModal(profileEditPopup)
});
profileAddButton.addEventListener('click', () => openModal(newCardPopup));

// Обработчик доя добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const cardElement = createCard(cardData, deleteCard, toggleLike, openImagePopup);
    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    newCardForm.reset();
});

// Обработчик для закрытия popUp
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});

// Открываем popUp с изображением
function openImagePopup(event) {

    imagePopupImg.src = event.target.src;
    imagePopupImg.alt = "Фото " + event.target.alt;
    imagePopupCaption.textContent = event.target.alt;

    openModal(imagePopup);
}


// Обработчик для формы редактирования данных профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = DescriptionInput.value;
    closeModal(profileEditPopup);
});

