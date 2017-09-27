let addProductToCart = () => {
    let itemQuantity = document.querySelector('.product-quantity').value;
    product.quantity = parseInt(itemQuantity);
    product.total = itemQuantity * product.price;
    firebase.database().ref('users/' + user.uid + '/cart/' + product.entityKey).update(product);
};

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', addProductToCart);
}