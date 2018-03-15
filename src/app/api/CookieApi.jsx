var _ = require('underscore');

export default {
    getCookie: function(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    setCookie: function(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            if (options.hasOwnProperty(propName)) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }
        }

        document.cookie = updatedCookie;
    },
    deleteCookie: function(name) {
        this.setCookie(name, "", {
           expires: -1
        });
    },
    
    clearLocalStorage: function() {
        localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_EXPIRES_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_TOKEN_TYPE);
    },

    getAccessTokenFromLocalStorage: function() {
        return localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
    },
    setAccessTokenToLocalStorage: function(value) {
        localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN, value);
    },
    getRefreshTokenFromLocalStorage: function() {
        return localStorage.getItem(LOCALSTORAGE_REFRESH_TOKEN);
    },
    setRefreshTokenToLocalStorage: function(value) {
        localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, value);
    },
    getExpiresTokenFromLocalStorage: function() {
        return localStorage.getItem(LOCALSTORAGE_EXPIRES_TOKEN);
    },
    setExpiresTokenToLocalStorage: function(value) {
        localStorage.setItem(LOCALSTORAGE_EXPIRES_TOKEN, value);
    },
    getTokenTypeFromLocalStorage: function() {
        return localStorage.getItem(LOCALSTORAGE_TOKEN_TYPE);
    },
    setTokenTypeToLocalStorage: function(value) {
        localStorage.setItem(LOCALSTORAGE_TOKEN_TYPE, value);
    }
}; 

export const LOCALSTORAGE_ACCESS_TOKEN = 'LOCALSTORAGE_ACCESS_TOKEN';
export const LOCALSTORAGE_REFRESH_TOKEN = 'LOCALSTORAGE_REFRESH_TOKEN';
export const LOCALSTORAGE_EXPIRES_TOKEN = 'LOCALSTORAGE_EXPIRES_TOKEN';
export const LOCALSTORAGE_TOKEN_TYPE = 'LOCALSTORAGE_TOKEN_TYPE';