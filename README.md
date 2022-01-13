# l10n.ts
Minimalistic &amp; type-safe Vanilla localization library.

Type-safety of this system is achieved by using *TypeScript* to write
your localization strings, rather than *JSON*. This leverages
*TypeScript*'s type system to catch localization mismatches &
inconsistencies at compile-time and provides better IntelliSense.

# Installation
Install using npm:

```shell
npm i --save @kiruse/l10n
```

or via yarn:

```shell
yarn add @kiruse/l10n
```

# Usage
Registry must be initialized & enriched with localization data. When
initializing, it's advised to explicitly specify generic parameters:

```typescript
import * as l10n from '@kiruse/l10n';

interface Strings {
  foo: string;
  bar: {
    baz: string;
    quux: string;
  }
}

const registry = l10n.init<Strings>();
const stringsEN: Strings = {...};
const stringsFR: Strings = {...};

registry.addLocales({
  en: stringsEN,
  'en-US': stringsEN,
  fr: stringsFR,
  'fr-FR': stringsFR,
});

console.log(registry.strings().bar.baz);
```

Of course, you may move localization data into separate files. Our
recommended solution looks like such:

```typescript
// file: localization/index.ts
import * as l10n from '@kiruse/l10n';
import enUS from './en-us';
import frFR from './fr-fr';

const strings = l10n.init<typeof enUS>()
  .addLocales({
    en: enUS,
    'en-US': enUS,
    fr: frFR,
    'fr-FR': frFR,
  })
  .setLocale('en')
  .strings;

console.log(strings('fr').bar.quux);
// => le quux
export default strings;
```

```typescript
// file: localization/en-us.ts
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
// file: localization/fr-fr.ts
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

With this workflow, TypeScript IntelliSense will immediately complain
if the contents of the French localization strings differ from those
of the English localization either in type or by adding and/or
removing properties.

## Interpolation
It is common issue to wish to interpolate values into the localization
string. Other libraries use indexed or named placeholders indicated
directly within the string through, for example, `{variable}`.

Of course, *l10n* also supports this type-safely. This is accomplished
through template literals tagged by `l10n.interpolated` like such:

```typescript
// file: localization/en-us.ts
import { interpolated } from '@kiruse/l10n';

const strings = {
  hello: interpolated`Hello, ${'firstName'} ${'lastName'}, age ${'age'}!`,
};
export default strings;
```

```typescript
// file: foo.ts
import strings from './localization';

// assuming file: 'localization/index.ts' has been changed appropriately

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


# Documentation
All features should be covered above. A more detailed documentation is
in the works.
