# mini18n
Minimalistic & type-safe i18n / internationalization library. Even this readme is longer than the library itself.

Type-safety of this system is achieved by using *TypeScript* to write
your localization strings, rather than *JSON*. This leverages
*TypeScript*'s type system to catch localization mismatches &
inconsistencies at compile-time, provides better IntelliSense, and
supports more complex logic for interpolation.

*mini18n* is designed for fast prototyping and small projects. If your
project has larger needs, such as pluralization, decimal or currency
normalization, worded counting, or accommodating a dedicated team of
localizers unfamiliar with code, this project will not satisfy you. I
can, however, recommend [i18next](https://www.i18next.com/).

**Anecdote:** Stupid lil' me didn't know the proper difference between
*i18n* and *l10n*, so I renamed & republished the library. It was formerly
known to some as [@kiruse/l10n](https://www.npmjs.com/package/@kiruse/l10n).
If you've come to this repository expecting *l10n*, that's why. It's
the same project. :)

# Installation
Install using npm:

```shell
npm i --save @kiruse/mini18n
```

or via yarn:

```shell
yarn add @kiruse/mini18n
```

# Usage
Registry must be initialized & enriched with localization data. When
initializing, it's advised to explicitly specify generic parameters:

```typescript
import * as i18n from '@kiruse/mini18n';
import en from './lang/en';
import fr from './lang/fr';

// assume: typeof en ===
type Strings = {
  foo: string;
  bar: {
    baz: string;
    quux: string;
  }
}

const strings = i18n.init<Strings>()
  .addLocales({
    en,
    'en-US',
    fr,
    'fr-FR',
  })
  .strings;

console.log(strings().bar.baz);
console.log(strings('fr').bar.baz);
```

To further simplify, I generally assume one of my localizations is the
canonical format:

```typescript
// file: lang/en-us.ts
const strings = {
  foo: 'the foo',
  bar: {
    baz: 'the baz',
    quux: 'the quux',
  },
};
export default strings;
```

```typescript
// file: lang/fr-fr.ts
import enUS from './en-us';
const strings: typeof enUS = {
  foo: 'le foo',
  bar: {
    baz: 'la baz',
    quux: 'le quux',
  },
};
export default strings;
```

With this approach, TypeScript IntelliSense will immediately complain
if the contents of the French localization strings differ from those
of the English localization either in type or by adding and/or
removing properties.

## Interpolation
It is common issue to wish to interpolate values into the localization
string. Other libraries use indexed or named placeholders indicated
directly within the string through, for example, `{variable}`.

*mini18n* also supports this type-safely. This is accomplished
through template literals tagged by `mini18n.interpolated` like such:

```typescript
// file: lang/en-us.ts
import { interpolated } from '@kiruse/mini18n';

const strings = {
  hello: interpolated`Hello, ${'firstName'} ${'lastName'}, age ${'age'}!`,
};
export default strings;
```

```typescript
// file: foo.ts
import strings from './lang';

// assuming file: 'lang/index.ts' has been changed appropriately

console.log(strings.hello({
  firstName: 'John',
  lastName: 'Doe',
  age: 42,
}));
// => Hello, John Doe, age 42!
```

The `interpolated` function takes your string literal and produces
an object type for its sole argument based on the interpolated strings.
This has three implications:

1. Placeholder names *must* be string literals - this also implies
   placeholders cannot be nested within objects,
2. TypeScript IntelliSense will inform you of which placeholders exist, and
3. TypeScript will complain if a placeholder is omitted or added on top.

## TODO
- Default values for `interpolated` strings.
- Lazy-loading localizations.
- More advanced features, like pluralization?
