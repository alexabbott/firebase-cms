let register = function(Handlebars) {
    let helpers = {
        inc: function(value, options) {
            return parseInt(value) + 1;
        },
        slugify: function(value, options) {
            value = value.trim();
            let slug = value.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-');
            return slug.toLowerCase();
        }
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