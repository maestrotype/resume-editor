import React from "react";
import { useTranslation } from "react-i18next";

const MobileTabs = ({ activeTab, setActiveTab }) => {

    const { t } = useTranslation();
    return (
        <div className="mobile-tabs">
            <button
                className={activeTab === 'editor' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('editor')}
            >
                {t("editor")}
            </button>
            <button
                className={activeTab === 'preview' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('preview')}
            >
                {t("preview")}
            </button>
        </div>
    );
};

export default MobileTabs;
