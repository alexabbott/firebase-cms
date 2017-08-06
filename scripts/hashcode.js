const inquirer = require("inquirer");

inquirer
  .prompt([{
    type: 'input',
    name: 'email',
    message: 'Email: '
  }])
  .then(({email}) => {
    const hashCode = getHashCode(email);
    console.log('Hashcode: ', hashCode);
  })

function getHashCode(input) {
    let hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
