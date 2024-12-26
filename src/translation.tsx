import i18next from "i18next";
import {initReactI18next} from "react-i18next";

export enum Language {
    PORTUGUESE_BRAZIL = 'pt-BR'
}

const translations: Record<string, any> = import.meta.glob('./**/*/translations.*.yaml', { eager: true });
const resources = (() => {
    const resources: Record<string, any> = {}
    for (const module in translations) {
        const ns = module.split("/").slice(1, -1).join('::');
        const lng = module.split("/").at(-1)?.split(".").at(-2);
        if (!lng || !Object.values(Language).includes(lng as Language))
            throw new Error(`Trying to setup a invalid or nonregistered translation language at module ${lng}`)

        if (!resources[lng])
            resources[lng] = {};
        Object.assign(resources[lng], { [ns]: translations[module].default })
    }

    return resources
})()

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "pt-BR",
        interpolation: {
            escapeValue: false
        }
    });

export default i18next;