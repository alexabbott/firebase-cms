let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
document.querySelector('.user-photo').addEventListener('click', () => menu.open = !menu.open);

document.querySelector('.login').addEventListener('click', () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()));
document.querySelector('.logout').addEventListener('click', () => firebase.auth().signOut());
const database = firebase.database();

function addProductToCart() {
    firebase.database().ref('users/' + user.uid + '/cart/' + product.entityKey).update(product);
}

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', addProductToCart);
}