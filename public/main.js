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

let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
document.querySelector('.user-photo').addEventListener('click', () => menu.open = !menu.open);

document.querySelector('.login').addEventListener('click', () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()));
document.querySelector('.logout').addEventListener('click', () => firebase.auth().signOut());

const MDCSelect = mdc.select.MDCSelect;
const MDCSnackbar = mdc.snackbar.MDCSnackbar;
const MDCSnackbarFoundation = mdc.snackbar.MDCSnackbarFoundation;
let snackbar;
let stateValue;

if (document.querySelector('.checkout-shippibillingng')) {
    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('MDCSelect:change', () => {
        stateValue = select.value;
    });

    document.querySelector('.continue').addEventListener('click', () => {
        let order = {
            billing: {
                name: document.querySelector('.name').value,
                email: document.querySelector('.email').value,
                address: document.querySelector('.address').value,
                city: document.querySelector('.city').value,
                state: stateValue,
                zip: document.querySelector('.zip').value,
            }
        }
        if (document.querySelector('.company').value) {
            order.billing.company = document.querySelector('.company').value;
        }
        window.localStorage.setItem('order', JSON.stringify(order));
        location.href = '/checkout/payment';
    });
}



if (document.querySelector('.checkout-shipping')) {
    let stateValue;
    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('MDCSelect:change', () => {
        stateValue = select.value;
    });

    document.querySelector('.continue').addEventListener('click', () => {
        let order = {
            shipping: {
                name: document.querySelector('.name').value,
                email: document.querySelector('.email').value,
                address: document.querySelector('.address').value,
                city: document.querySelector('.city').value,
                state: stateValue,
                zip: document.querySelector('.zip').value,
            }
        }
        if (document.querySelector('.company').value) {
            order.shipping.company = document.querySelector('.company').value;
        }
        window.localStorage.setItem('order', JSON.stringify(order));
        location.href = '/checkout/billing';
    });
}


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