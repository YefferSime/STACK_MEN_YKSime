// handlebarsHelpers.js

import handlebars from 'handlebars';

handlebars.registerHelper('isEqual', function(a, b) {
    return a === b;
});

export { handlebars };
