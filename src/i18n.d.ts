import "i18next";
import enLogin from "./locale/en/login.json";
import enMainPage from "./locale/en/mainPage.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: { login: typeof enLogin, mainPage: typeof enMainPage };
  }
}