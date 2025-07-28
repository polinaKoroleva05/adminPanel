import {useTranslation} from 'react-i18next';

export default function LanguageSwitcher(){
    const {i18n} = useTranslation();

    const changeLanguage = (lng: 'en' | 'ru') => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>en</button>
            <button onClick={() => changeLanguage('ru')}>ru</button>
        </div>
    );
};
