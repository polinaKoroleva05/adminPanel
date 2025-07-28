import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enLogin from "./locale/en/login.json";
import enMainPage from "./locale/en/mainPage.json";
import ruLogin from "./locale/ru/login.json";
import ruMainPage from "./locale/ru/mainPage.json";

// Если забудем добавить поле в один из языков,
// здесь появится TypeScript ошибка
const resources: Record<string, { login: typeof enLogin, mainPage: typeof enMainPage }> = {
  en: { login: enLogin, mainPage: enMainPage },
  ru: { login: ruLogin, mainPage: ruMainPage },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;