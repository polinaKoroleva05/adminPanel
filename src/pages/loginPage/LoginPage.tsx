import { useForm } from '@mantine/form';
import styles from './loginPage.module.css';
import { Button, Paper, TextInput } from '@mantine/core';
import {AuthService} from '@/app/api';
import { useEffect } from 'react';
import { getUserQueryMiddleware } from '@/app/taskStore';
import { useNavigate } from 'react-router';


export default function LoginPage(){
    const {loginMutation, isLoginLoading} = getUserQueryMiddleware();
    console.log('isLoginLoading', isLoginLoading)
    const navigate = useNavigate()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            password: '',
            email: '',
        },

        validate: {
            email: (value) =>
                value.length < 64 ? null : "Name can't be more 64 symbols"
        }
    });
    function onLogin(loginData: {email: string, password: string}){
        loginMutation(loginData)
        console.log('loginData', loginData)

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
    )
}