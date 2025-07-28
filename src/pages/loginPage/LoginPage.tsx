import {useForm} from '@mantine/form';
import styles from './loginPage.module.css';
import {Button, Paper, TextInput, Text, Loader} from '@mantine/core';
import {getAuthQueryMiddleware, useAuthQuery} from '@/app/taskStore';
import {useNavigate} from 'react-router';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {LanguageSwitcher} from '@widgets/languageSwitcher';
import {useTranslation} from 'react-i18next';
import '@/app/i18n/i18n';
import {notifications} from '@mantine/notifications';


function useTraceUpdate(props: any) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        console.log(prev.current[k], v)
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}


export default function LoginPage() {
    const getQueryMiddlewareMemo = useCallback(() => {
        return getAuthQueryMiddleware();
    }, []);
    const useAuthQueryMemo = useCallback(() => {
        return useAuthQuery();
    }, []);
    
    const {loginMutation, isLoginLoading, all, isSuccessLogin} =
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
    useTraceUpdate({form, all, loginMutation, isLoginLoading, isSuccessLogin, getQueryMiddlewareMemo, useAuthQueryMemo, isLoading, isError, needAuth});
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
