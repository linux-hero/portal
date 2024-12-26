import {useTranslation} from "react-i18next";

export default function Terminal() {
    const { t } = useTranslation('components::terminal')
    return <h1>{t("welcome_message")}</h1>
}