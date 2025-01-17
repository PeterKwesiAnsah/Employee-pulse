module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': [
      'common',
      'home',
      'surveyCreate',
      '404',
      'login',
      'signup',
      'settings',
      'surveys',
      'surveyAnswer',
      'survey',
    ],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};
