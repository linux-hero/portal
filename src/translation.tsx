import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const translations: Record<string, any> = import.meta.glob('./modules/**/*/translations.*.yaml', { eager: true });
const resources = Object.keys(translations).reduce((res, module: string) => {
    const namespace = module.split("/").at(-2);
    const filename = module.split("/").at(-1)
    if (!namespace || !filename)
        throw new Error(`Unable to parse ${module} translation`);

    const lng = filename.split(".").at(-2);
    if (!lng)
        throw new Error(`Unable to parse ${module} translation`);

    if (!res[lng])
        res[lng] = {};
    res[lng][namespace] = translations[module].default

    return res;
}, {} as any)

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "pt",
        interpolation: {
            escapeValue: false
        }
    });

export default i18next;