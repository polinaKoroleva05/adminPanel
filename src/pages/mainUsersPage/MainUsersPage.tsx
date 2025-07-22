import {AppShell, Burger, Group, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Outlet, Route, Routes} from 'react-router';

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
                    The burger icon is always visible
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='md'>
                Navbar is collapsed on mobile at sm breakpoint. At that point it
                is no longer offset by padding in the main element and it takes
                the full width of the screen when opened.
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
                <Text>This is the main section, your app content here.</Text>
                <Text>
                    Layout used in most cases – Navbar and Header with fixed
                    position
                </Text>
            </AppShell.Main>
        </AppShell>
    );
}
