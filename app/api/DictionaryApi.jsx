var _ = require('underscore');

export default {
    firstOrDefault : function (dictionary, key) {
        if (!dictionary || !key) {
            return null;
        }
        return dictionary.find((x) => { return x.key === key });
    },
    firstOrDefaultValue : function (dictionary, key) {
        if (!dictionary || !key) {
            return null;
        }
        const result = dictionary.find((x) => { return x.key === key });
        return result ? result.value : null;
    },
    containsKey : function (dictionary, key) {
        if (!dictionary || !key) {
            return null;
        }
        const result = dictionary.find((x) => { return x.key === key });
        return result ? true : false;
    },
}; 