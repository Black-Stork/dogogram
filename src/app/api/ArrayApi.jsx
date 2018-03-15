var _ = require('underscore');

export default {
    sum : function (array, field = false) {
        if (!array) {
            return null;
        }
        let sum = 0;
        if (field) {
            for (var i = 0; i < array.length; i++) {
                sum += array[i][field];
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
        }

        return sum;
    },
    orderBy: function(array, field = false) {
        if (field) {
            return array.sort((a, b) => { return a[field] - b[field] });
        } else {
            return array.sort((a, b) => { return a - b });
        }
    },
    orderByDescending: function(array, field = false) {
        if (field) {
            return array.sort((a, b) => { return b[field] - a[field] });
        } else {
            return array.sort((a, b) => { return b - a });
        }
    },
    min: function (array, field = false) {
        let min = Infinity;
        if (field) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][field] < min) {
                    min = array[i][field];
                }
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i] < min) {
                    min = array[i];
                }
            }
        }
        return min === Infinity ? 0 : min;
    },
    max: function (array, field = false) {
        let max = -Infinity;
        if (field) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][field] > max) {
                    max = array[i][field];
                }
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i] > max) {
                    max = array[i];
                }
            }
        }
        return max === -Infinity ? 0 : max;
    },
    subArray: function(array, start, end) {
        if (!array) {
            return array;
        }
        if (start < 0) {
            start = 0;
        }
        if (end < start || end > array.length) {
            end = array.length;
        }
        return array.slice(start, end);
    }
}; 