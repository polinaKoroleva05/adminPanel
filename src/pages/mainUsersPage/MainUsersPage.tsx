import {
    getAuthQueryMiddleware,
    useAuthQuery
} from '@/app/taskStore';
import {
    ActionIcon,
    AppShell,
    Burger,
    Group,
    Loader,
    NavLink,
    Text,
    useMantineColorScheme
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router';
import HomeIcon from '@shared/ui/home.svg?react';
import CreateUserIcon from '@shared/ui/createUser.svg?react';
import LogOutIcon from '@shared/ui/logout.svg?react';
import SunIcon from '@shared/ui/sun.svg?react';
import MoonIcon from '@shared/ui/moon.svg?react';
import StarIcon from '@shared/ui/star.svg?react';
import styles from './mainUsersPage.module.css';

export default function MainUsersPage() {
    const {setColorScheme} = useMantineColorScheme();
    const mantineTheme = document.documentElement.getAttribute(
        'data-mantine-color-scheme'
    );
    const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
    const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
    const {data: dataUser, isLoading, isError} = useAuthQuery();
    const [successAuth, setSuccessAuth] = useState(false)
    const {logoutMutation} = getAuthQueryMiddleware();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading === false && isError) {
            console.log('you not authed');
            navigate('/login');
        }
        if(isLoading === false && isError === false){
            setSuccessAuth(true)
        }
    }, [isLoading, isError]);

    function handleLogout() {
        logoutMutation();
        navigate('/login');
    }

    if (!successAuth) {
        return (
            <>
                <Loader />
                <p>Check auth...</p>
            </>
        );
    }else{

        return (
            <AppShell
                padding='md'
                header={{height: 60}}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: {mobile: !mobileOpened, desktop: !desktopOpened}
                }}
            >
                <AppShell.Header>
                    <Group h='100%' px='md' justify='space-between'>
                        <Group>
                            <Burger
                                opened={mobileOpened}
                                onClick={toggleMobile}
                                hiddenFrom='sm'
                                size='sm'
                            />
                            <Burger
                                opened={desktopOpened}
                                onClick={toggleDesktop}
                                visibleFrom='sm'
                                size='sm'
                            />
                            <Text size='xl' fw={500}>
                                Admin Panel Siriur
                            </Text>
                            <StarIcon />
                        </Group>
                        <Group>
                            <Text>{dataUser.email}</Text>
                            <ActionIcon
                                variant='outline'
                                color={mantineTheme == 'dark' ? 'yellow' : 'blue'}
                                onClick={() =>
                                    mantineTheme == 'dark'
                                        ? setColorScheme('light')
                                        : setColorScheme('dark')
                                }
                                title='Toggle color scheme'
                            >
                                {mantineTheme == 'dark' ? (
                                    <SunIcon style={{width: 18, height: 18}} />
                                ) : (
                                    <MoonIcon style={{width: 18, height: 18}} />
                                )}
                            </ActionIcon>
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p='md'>
                    <NavLink
                        styles={{
                            label: {fontSize: '1.05rem'}
                        }}
                        label='Main'
                        component={Link}
                        to='/'
                        leftSection={<HomeIcon />}
                    />
                    <NavLink
                        styles={{
                            label: {fontSize: '1.05rem'}
                        }}
                        label='Create user'
                        component={Link}
                        to='/user/create/mantine'
                        leftSection={<CreateUserIcon />}
                    >
                        {/* <NavLink
                            styles={{
                                label: {fontSize: '1.05rem'}
                            }}
                            label='Mantine'
                            href='#required-for-focus'
                        />
                        <NavLink
                            styles={{
                                label: {fontSize: '1.05rem'}
                            }}
                            label='Formic'
                            href='#required-for-focus'
                        />
                        <NavLink
                            styles={{
                                label: {fontSize: '1.05rem'}
                            }}
                            label='React Hook Form'
                            href='#required-for-focus'
                        /> */}
                    </NavLink>
                    <NavLink
                        styles={{
                            label: {fontSize: '1.05rem'}
                        }}
                        className={styles.navLink}
                        fw={500}
                        label='Log out'
                        component='button'
                        onClick={handleLogout}
                        leftSection={<LogOutIcon />}
                    />
                </AppShell.Navbar>
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        );
    }

}
