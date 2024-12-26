import {useTranslation} from "react-i18next";
import Terminal from "../../components/terminal/terminal";

export default function App() {
    const { t } = useTranslation("modules::app");

    return <>
        <h1>{t("welcome_message")}</h1>
        <Terminal />
    </>
}