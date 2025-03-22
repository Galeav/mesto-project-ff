// Открываем popUp
export function openModal(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 0);
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('mousedown', handleOverlayClick);
}
// Закрываем popUp
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 500);
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('mousedown', handleOverlayClick);
}

// Закрываем popUp на Esc
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    }
}