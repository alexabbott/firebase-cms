let checkCookie = () => {
    // Checks if it's likely that there is a signed-in Firebase user and the session cookie expired.
    // In that case we'll hide the body of the page until it will be reloaded after the cookie has been set.
    let hasSessionCookie = document.cookie.indexOf('__session=') !== -1;
    let isProbablySignedInFirebase = typeof Object.keys(localStorage).find((key) => {
        return key.startsWith('firebase:authUser')
        }) !== 'undefined';
    if (!hasSessionCookie && isProbablySignedInFirebase) {
        let style = document.createElement('style');
        style.id = '__bodyHider';
        style.appendChild(document.createTextNode('body{display:none}'));
        document.head.appendChild(style);
    }
}
checkCookie();

document.addEventListener('DOMContentLoaded', () => {
    // Make sure the Firebase ID Token is always passed as a cookie.
    firebase.auth().addAuthTokenListener((idToken) => {
        let hadSessionCookie = document.cookie.indexOf('__session=') !== -1;
        document.cookie = '__session=' + idToken + ';max-age=' + (idToken ? 3600 : 0);
        // If there is a change in the auth state compared to what's in the session cookie we'll reload after setting the cookie.
        if ((!hadSessionCookie && idToken) || (hadSessionCookie && !idToken)) {
            window.location.reload(true);
        } else {
            // In the rare case where there was a user but it could not be signed in (for instance the account has been deleted).
            // We un-hide the page body.
            let style = document.getElementById('__bodyHider');
            if (style) {
                document.head.removeChild(style);
            }
        }
    });
});