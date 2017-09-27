const database = firebase.database();

function addProductToCart() {
    firebase.database().ref('users/' + user.uid + '/cart/' + product.entityKey).update(product);
}

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', addProductToCart);
}