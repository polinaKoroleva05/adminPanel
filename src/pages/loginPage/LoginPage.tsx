import {useForm} from '@mantine/form';
import styles from './loginPage.module.css';
import {Button, Paper, TextInput, Text, Loader} from '@mantine/core';
import {getAuthQueryMiddleware, useAuthQuery} from '@/app/taskStore';
import {useNavigate} from 'react-router';
import {useCallback, useEffect, useState} from 'react';
import {LanguageSwitcher} from '@widgets/languageSwitcher';
import {useTranslation} from 'react-i18next';
import '@/app/i18n/i18n';
import {notifications} from '@mantine/notifications';


export default function LoginPage() {
    const getQueryMiddlewareMemo = useCallback(() => {
        return getAuthQueryMiddleware();
    }, []);
    const useAuthQueryMemo = useCallback(() => {
        return useAuthQuery();
    }, []);
    
    const {loginMutation, all} =
    getQueryMiddlewareMemo();
    const {isLoading, isError} = useAuthQueryMemo();
    
    const [needAuth, setNeedAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('rerender')
    }, [])
    useEffect(() => {
        if (isLoading === false && isError === false) {
            console.log('you authed');
            navigate('/');
        }
        if (isLoading === false && isError === true) {
            setNeedAuth(true);
        }
    }, [isLoading, isError]);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            password: '',
            email: ''
        }
    });
    if (all.error) {
        console.log('in notif', needAuth)
        let axiosError: any = all.error;
        switch (axiosError.status) {
            case 400:
                notifications.show({
                    title: 'Login error',
                    message: 'Invalid password or email',
                    color: 'red'
                });
                break;
            case 404:
                notifications.show({
                    title: 'Login error',
                    message: 'Cant fetch server',
                    color: 'gray'
                });
        }
    }
    const {t} = useTranslation('login');
    function onLogin(loginData: {email: string; password: string}) {
        console.log('mutation')
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
