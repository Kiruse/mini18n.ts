type Mapped<T extends readonly string[]> = {
  [K in T[number]]: any
}

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
export function interpolated<Args extends readonly string[]>(strings: TemplateStringsArray, ...keys: Args): ((values: Mapped<Args>) => string) {
  return (values: Mapped<Args>) => {
    const parts = [strings[0]]
    keys.forEach((key, i) => {
      parts.push(values[key as keyof Mapped<Args>]+'')
      parts.push(strings[i+1])
    })
    return parts.join('')
  }
}

export function init<T>() {
  return Registry.init<T>();
}

export class Registry<T, Locales> {
  private _locales: Locales;
  private _locale: string;
  
  constructor(init: Locales, locale: string = 'en') {
    this._locales = init;
    this._locale = locale;
  }
  
  strings = (locale: keyof Locales = this._locale as keyof Locales) => {
    return locale in this._locales
      ? this._locales[locale as keyof Locales]
      : this._locales['en' as keyof Locales];
  }
  
  addLocales = <L>(locales: L) => {
    return new Registry<T, Locales & L>(
      Object.assign(this._locales, locales),
      this._locale,
    )
  }
  
  setLocale = (locale: keyof Locales) => {
    this._locale = locale as string;
    return this;
  }
  
  getLocale = () => this._locale;
  
  static init<T>() {
    return new Registry<T, {}>({})
  }
}
