import * as l10n from '..';

describe('l10n', () => {
  test('strings', () => {
    const enUS = {
      general: {
        foo: 'foo',
        bar: 'bar',
      },
    };
    
    const strings = l10n.init<typeof enUS>()
      .addLocales({en: enUS, 'en-US': enUS})
      .strings;
    expect(strings().general.foo).toEqual('foo');
    expect(strings().general.bar).toEqual('bar');
  });
  
  test('other locale', () => {
    const enUS = {
      general: {
        foo: 'the foo',
        bar: 'the bar',
      },
    };
    
    const deDE = {
      general: {
        foo: 'Der Foo',
        bar: 'Die Bar',
      },
    };
    
    const strings = l10n.init<typeof enUS>()
      .addLocales({
        en: enUS,
        'en-US': enUS,
      })
      .addLocales({
        de: deDE,
        'de-DE': deDE,
      })
      .strings;
    expect(strings('en').general.foo).toEqual('the foo');
    expect(strings('de').general.foo).toEqual('Der Foo');
  });
  
  test('change default locale', () => {
    const deDE = {
      general: {
        foo: 'Der Foo',
        bar: 'Die Bar',
      },
    };
    
    const strings = l10n.init<typeof deDE>()
      .addLocales({
        de: deDE,
        'de-DE': deDE,
      })
      .setLocale('de')
      .strings;
    expect(strings().general.foo).toEqual('Der Foo');
    expect(strings().general.bar).toEqual('Die Bar');
  });
});
