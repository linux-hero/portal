import {useTranslation} from "react-i18next";

export default function App() {
    const { t } = useTranslation();

    return <h1>{t("Welcome Message")}</h1>
}