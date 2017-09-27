let register = (Handlebars) => {
    let helpers = {
        slugify: (value, options) => {
            value = value.trim();
            let slug = value.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-');
            return slug.toLowerCase();
        },
        json: (value) => {
            return JSON.stringify(value);
        },
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (let prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);