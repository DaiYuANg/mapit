import i18n from '../../i18n';

export const i18nProvider = {
  translate: (key: string, params?: any) => String(i18n.t(key, params)),
  changeLocale: (lang: string) => i18n.changeLanguage(lang),
  getLocale: () => i18n.language,
};
