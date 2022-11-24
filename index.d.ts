type Mapped<T extends readonly string[]> = {
    [K in T[number]]: any;
};
type LocaleMap<T extends {}> = {
    [locale: string]: T;
};
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
export declare function interpolated<Args extends readonly string[]>(strings: TemplateStringsArray, ...keys: Args): ((values: Mapped<Args>) => string);
/** Initiate a new instance, binding a strings mapping type.
 * Next, add locales with `addLocales` and set a default locale with `setLocale`.
 */
export declare function init<T extends {}>(): Registry<T, {}>;
export declare class Registry<T extends {}, Locales extends LocaleMap<T>> {
    private _locales;
    private _locale;
    constructor(init: Locales, locale?: string);
    strings: (locale?: keyof Locales) => Locales[keyof Locales];
    addLocales: <L>(locales: L) => Registry<T, Locales & L>;
    setLocale: (locale: keyof Locales) => this;
    getLocale: () => string;
    static init<T extends {}>(): Registry<T, {}>;
}
export {};
