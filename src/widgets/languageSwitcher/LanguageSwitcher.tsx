import {SegmentedControl} from '@mantine/core';
import {useTranslation} from 'react-i18next';

export default function LanguageSwitcher() {
    const {i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        if(lng == 'en' || lng=='ru'){
            i18n.changeLanguage(lng);
        }
    };

    return (
        <SegmentedControl
            value={i18n.language}
            onChange={changeLanguage}
            data={[
                {label: 'en', value: 'en'},
                {label: 'ru', value: 'ru'}
            ]}
        />
    );
}
