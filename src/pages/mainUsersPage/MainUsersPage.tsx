import {AppShell, Burger, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Link, Outlet} from 'react-router';

export default function MainUsersPage() {
    const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
    const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);

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
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                <Link to="/">Main</Link>
                <Link to="/user/edit/mantine">edit mantine</Link>
                <Link to="/user/create/mantine">create mantine</Link>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
