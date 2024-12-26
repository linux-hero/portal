import {useTranslation} from "react-i18next";

export default function App() {
    const { t } = useTranslation("app");

    return <h1>{t("welcome_message")}</h1>
}