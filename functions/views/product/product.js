let addProductToCart = () => {
    let itemQuantity = document.querySelector('.product-quantity').value;
    product.quantity = parseInt(itemQuantity);
    product.total = itemQuantity * product.price;
    firebase.database().ref('users/' + user.uid + '/cart/' + product.entityKey).update(product);
    snackbar.show({
        message: 'Product added to cart!',
        actionText: 'View Cart',
        actionHandler: function () {
            location.href = '/cart';
        }
    });
};

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener('click', addProductToCart);
    snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
}