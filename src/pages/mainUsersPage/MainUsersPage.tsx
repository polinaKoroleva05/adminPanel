import {useAuthContext} from '@/app/taskStore';
import {AppShell, Burger, Button, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useEffect} from 'react';
import {Link, Outlet, useNavigate} from 'react-router';

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
                    Admin Panel Siriur
                    <Button
                        variant='outline'
                        color='#8c8c8cff'
                        size='xs'
                        radius='sm'
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <Link to='/'>Main</Link>
                <Link to='/user/edit/mantine'>edit mantine</Link>
                <Link to='/user/create/mantine'>create mantine</Link>
                <Link to='/login'>login</Link>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
