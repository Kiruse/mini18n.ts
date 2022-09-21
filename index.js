"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = exports.init = exports.interpolated = void 0;
/** Creates a function from given template string literal which takes
 * a mapping of key-value pairs to interpolate into this template string.
 *
 * Example
 * -------
 * ```typescript
 * const helloName = interpolated`Hello, ${'firstName'} ${'lastName'}, age ${'age'}!`
 * helloName({
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   age: 42,
 * })
 * // => 'Hello, John Doe, age 42!'
 * ```
 *
 * **Note** that it is important the interpolated values are string literals
 * for the type system to properly pick these names up.
 */
function interpolated(strings) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return function (values) {
        var parts = [strings[0]];
        keys.forEach(function (key, i) {
            parts.push(values[key] + '');
            parts.push(strings[i + 1]);
        });
        return parts.join('');
    };
}
exports.interpolated = interpolated;
/** Initiate a new instance, binding a strings mapping type.
 * Next, add locales with `addLocales` and set a default locale with `setLocale`.
 */
function init() {
    return Registry.init();
}
exports.init = init;
var Registry = /** @class */ (function () {
    function Registry(init, locale) {
        if (locale === void 0) { locale = 'en'; }
        var _this = this;
        this.strings = function (locale) {
            if (locale === void 0) { locale = _this._locale; }
            return locale in _this._locales
                ? _this._locales[locale]
                : _this._locales['en'];
        };
        this.addLocales = function (locales) {
            return new Registry(Object.assign(_this._locales, locales), _this._locale);
        };
        this.setLocale = function (locale) {
            _this._locale = locale;
            return _this;
        };
        this.getLocale = function () { return _this._locale; };
        this._locales = init;
        this._locale = locale;
    }
    Registry.init = function () {
        return new Registry({});
    };
    return Registry;
}());
exports.Registry = Registry;
//# sourceMappingURL=index.js.map