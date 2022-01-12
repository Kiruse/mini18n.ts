declare type Mapped<T extends readonly string[]> = {
    [K in T[number]]: any;
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
export declare function init<T>(): Registry<T, {}>;
export declare class Registry<T, Locales> {
    private _locales;
    private _locale;
    constructor(init: Locales, locale?: string);
    strings: (locale?: keyof Locales) => Locales[keyof Locales];
    addLocales: <L>(locales: L) => Registry<T, Locales & L>;
    setLocale: (locale: keyof Locales) => this;
    getLocale: () => string;
    static init<T>(): Registry<T, {}>;
}
export {};
