var _ = require('underscore');

export default {
    classSet : function (obj) {
        const result = [];
        for(const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                result.push(key);
            }
        }
        return result.join(' ');
    },
}; 