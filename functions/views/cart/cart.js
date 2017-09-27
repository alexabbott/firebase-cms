let removeProduct = (itemKey) => {
    firebase.database().ref('users/' + user.uid + '/cart/' + itemKey).remove().then((item) => {
        window.location.reload(true);
    });
};

if (document.querySelector('.remove-item')) {
    let removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(el => el.addEventListener('click', (event) => {
        let targetElement = event.target || event.srcElement;
        removeProduct(targetElement.getAttribute('data-item'));
    }));
}