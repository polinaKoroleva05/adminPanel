import {useAuthContext} from '@/app/taskStore';
import {AppShell, Burger, Group, NavLink, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useEffect} from 'react';
import {Link, Outlet, useNavigate} from 'react-router';
import HomeIcon from '@shared/ui/home.svg?react';
import CreateUserIcon from '@shared/ui/createUser.svg?react';
import LogOutIcon from '@shared/ui/logout.svg?react';

export default function MainUsersPage() {
    const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
    const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
    const navigate = useNavigate();
    const {isAuth, setAuth} = useAuthContext();
    useEffect(() => {
        if (isAuth === false) {
            console.log('you not authed');
            navigate('/login');
        }
    });
    function handleLogout() {
        setAuth(false);
        navigate('/login');
    }
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
                <Group h='100%' px='md'>
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
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <NavLink
                    label='Main'
                    component={Link}
                    to='/'
                    leftSection={<HomeIcon />}
                />
                <NavLink
                    label='Create user'
                    component={Link}
                    to='/user/create/mantine'
                    leftSection={<CreateUserIcon />}
                />
                <NavLink
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
