let removeProduct = (target) => {
    firebase.database().ref('users/' + user.uid + '/cart/' + target.getAttribute('data-item')).remove()
    .then(_ => {
        target.parentNode.parentNode.remove();
        delete cart[target.getAttribute('data-item')];
        calculateCartTotal();
        snackbar.show({
            message: 'Product removed from cart!',
            actionText: 'Ok',
            actionHandler: function () {
                console.log('my cool function');
            }
        });
    });
};

let calculateCartTotal = () => {
    const cartArray = Object.keys(cart).map(key => cart[key]);
    const cartTotal = cartArray.reduce((acc, item) => acc + item.total, 0);
    document.querySelector('.cart-subtotal').innerText = parseFloat(cartTotal.toFixed(2));
};

if (document.querySelector('.remove-item')) {
    snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    let removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(el => el.addEventListener('click', (event) => {
        let targetElement = event.target || event.srcElement;
        removeProduct(targetElement);
    }));
    calculateCartTotal();
}
