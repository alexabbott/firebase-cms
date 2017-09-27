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
let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
document.querySelector('.user-photo').addEventListener('click', () => menu.open = !menu.open);

document.querySelector('.login').addEventListener('click', () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()));
document.querySelector('.logout').addEventListener('click', () => firebase.auth().signOut());
let addProductToCart = () => {
    let itemQuantity = document.querySelector('.product-quantity').value;
    product.quantity = parseInt(itemQuantity);
    product.total = itemQuantity * product.price;
    firebase.database().ref('users/' + user.uid + '/cart/' + product.entityKey).update(product);
};

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', addProductToCart);
}