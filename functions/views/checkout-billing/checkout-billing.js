
if (document.querySelector('.checkout-billing')) {
    let stateValue;
    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('MDCSelect:change', () => {
        stateValue = select.value;
    });

    document.querySelector('.continue').addEventListener('click', () => {
        let order = JSON.parse(window.localStorage.getItem('order'));
        order.billing = {
            name: document.querySelector('.name').value,
            email: document.querySelector('.email').value,
            address: document.querySelector('.address').value,
            city: document.querySelector('.city').value,
            state: stateValue,
            zip: document.querySelector('.zip').value,
        };
        if (document.querySelector('.company').value) {
            order.billing.company = document.querySelector('.company').value;
        }
        window.localStorage.setItem('order', JSON.stringify(order));
        location.href = '/checkout/payment';
    });
}

