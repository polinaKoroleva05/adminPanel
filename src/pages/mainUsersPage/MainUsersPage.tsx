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
import { LanguageSwitcher } from '@/widgets/languageSwitcher';
import { useTranslation } from 'react-i18next';

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
    const [active, setActive] = useState(0);
    const {t} = useTranslation('mainPage');

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
                <p>{t('loaderMessage')}</p>
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
                                {t('appTitle')}
                            </Text>
                            <StarIcon />
                        </Group>
                        <Group>
                            <LanguageSwitcher />
                            <Text>{dataUser.email}</Text>
                            <ActionIcon
                                variant='outline'
                                color={mantineTheme == 'dark' ? 'yellow' : 'blue'}
                                onClick={() =>
                                    mantineTheme == 'dark'
                                        ? setColorScheme('light')
                                        : setColorScheme('dark')
                                }
                                title={t('toggleColorSheme')}
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
                    active={0 === active}
                        styles={{
                            label: {fontSize: '1.05rem'}
                        }}
                        label={t('mainButton')}
                        component={Link}
                        to='/'
                        leftSection={<HomeIcon />}
                        onClick={() => setActive(2)}
                    />
                    <NavLink
                    active={1 === active}
                        styles={{
                            label: {fontSize: '1.05rem'}
                        }}
                        label={t('createUserButton')}
                        component={Link}
                        to='/user/create/mantine'
                        leftSection={<CreateUserIcon />}
                        onClick={() => setActive(1)}
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
                        label={t('logoutButton')}
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
