let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
document.querySelector('.user-photo').addEventListener('click', () => menu.open = !menu.open);

document.querySelector('.login').addEventListener('click', () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()));
document.querySelector('.logout').addEventListener('click', () => firebase.auth().signOut());

const MDCSelect = mdc.select.MDCSelect;
const MDCSnackbar = mdc.snackbar.MDCSnackbar;
const MDCSnackbarFoundation = mdc.snackbar.MDCSnackbarFoundation;
let snackbar;