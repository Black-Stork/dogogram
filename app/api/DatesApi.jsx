var _ = require('underscore');

export default {
    dateIsValid : function(year, month, day) {
        year = parseInt(year);
        month = parseInt(month) - 1;
        day = parseInt(day);
        const date = new Date(year, month, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        );
    },
}; 