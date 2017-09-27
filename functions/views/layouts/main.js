let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
document.querySelector('.user-photo').addEventListener('click', () => menu.open = !menu.open);

document.querySelector('.login').addEventListener('click', () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()));
document.querySelector('.logout').addEventListener('click', () => firebase.auth().signOut());