import {useForm} from '@mantine/form';
import styles from './loginPage.module.css';
import {Button, Paper, TextInput, Text, Loader} from '@mantine/core';
import {getAuthQueryMiddleware, useAuthQuery} from '@/app/taskStore';
import {useNavigate} from 'react-router';
import {useEffect, useState} from 'react';
import {LanguageSwitcher} from '@widgets/languageSwitcher';
import {useTranslation} from 'react-i18next';
import '@/app/i18n/i18n';

export default function LoginPage() {
    const {loginMutation, isLoginLoading, isSuccessLogin} =
        getAuthQueryMiddleware();
    console.log('isLoginLoading', isLoginLoading);
    console.log('isSuccessLogin', isSuccessLogin);
    const [needAuth, setNeedAuth] = useState(false);
    const {isLoading, isError} = useAuthQuery();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoading === false && isError === false) {
            console.log('you authed');
            navigate('/');
        }
        if (isLoading === false && isError === true) {
            setNeedAuth(true);
        }
    });
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            password: '',
            email: ''
        }
    });
    const {t} = useTranslation('login');
    function onLogin(loginData: {email: string; password: string}) {
        loginMutation(loginData);
    }
    if (!needAuth) {
        return (
            <>
                <Loader />
                <p>{t('loaderMessage')}</p>
            </>
        );
    } else {
        return (
            <div className={styles.page}>
                <LanguageSwitcher />
                <Paper className={styles.form} shadow='md' radius='md'>
                    <Text fw={500} ta='center'>
                        {t('appealLogin')}
                    </Text>
                    <form onSubmit={form.onSubmit(onLogin)}>
                        <TextInput
                            label={t('email')}
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label={t('password')}
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />

                        <Button className={styles.button} type='submit'>
                            {t('submit')}
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
