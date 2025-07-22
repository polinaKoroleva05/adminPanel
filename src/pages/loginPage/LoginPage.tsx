import {useForm} from '@mantine/form';
import styles from './loginPage.module.css';
import {Button, Paper, TextInput, Text, Loader} from '@mantine/core';
import {
    getAuthQueryMiddleware,
    useAuthQuery
} from '@/app/taskStore';
import {useNavigate} from 'react-router';
import {useEffect, useState} from 'react';

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
        },

        validate: {
            email: (value) =>
                value.length < 64 ? null : "Name can't be more 64 symbols"
        }
    });
    function onLogin(loginData: {email: string; password: string}) {
        loginMutation(loginData);
    }
    if (!needAuth) {
        return (
            <>
                <Loader />
                <p>Check auth...</p>
            </>
        );
    } else {
        return (
            <div className={styles.page}>
                <Paper className={styles.form} shadow='md' radius='md'>
                    <Text fw={500} ta='center'>
                        Please log in
                    </Text>
                    <form onSubmit={form.onSubmit(onLogin)}>
                        <TextInput
                            label='Email'
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label='Password'
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />

                        <Button className={styles.button} type='submit'>
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
