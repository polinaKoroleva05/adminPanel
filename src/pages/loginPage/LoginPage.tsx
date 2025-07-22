import {useForm} from '@mantine/form';
import styles from './loginPage.module.css';
import {Button, Paper, TextInput} from '@mantine/core';
import {getAuthQueryMiddleware, useAuthContext} from '@/app/taskStore';
import {useNavigate} from 'react-router';
import { useEffect } from 'react';

export default function LoginPage() {
    const {isAuth, setAuth} = useAuthContext();
    const {loginMutation, isLoginLoading, isSuccessLogin} =
        getAuthQueryMiddleware(setAuth);
    console.log('isLoginLoading', isLoginLoading);
    console.log('isSuccessLogin', isSuccessLogin);
    console.log('isAuth', isAuth);
    const navigate = useNavigate();
    useEffect(()=>{
        if (isAuth === true) {
            console.log('you authed');
            navigate('/');
        }
    })
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
    return (
        <div className={styles.page}>
            <Paper className={styles.form} shadow='md' radius='md'>
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

                    <Button type='submit'>Login</Button>
                </form>
            </Paper>
        </div>
    );
}
