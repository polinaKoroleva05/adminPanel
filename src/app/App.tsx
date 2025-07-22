import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import './App.css';
import {Route, Routes} from 'react-router';
import {CreateUserPage} from '@/pages/createUserPage';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const client = new QueryClient();
import {ModalsProvider} from '@mantine/modals';
import {MainUsersPage} from '@pages/mainUsersPage';
import {EditUserPage} from '@/pages/editUserPage';
import {LoginPage} from '@pages/loginPage';
import AllUsersPage from '@/pages/allUsersPage/AllUsersPage';

function App() {
    return (
        <MantineProvider>
            <ModalsProvider>
                    <QueryClientProvider client={client}>
                        <Routes>
                            <Route path='/' element={<MainUsersPage />}>
                                <Route path='/' element={<AllUsersPage />} />
                                <Route
                                    path='/user/edit/:id/*'
                                    element={<EditUserPage />}
                                />
                                <Route
                                    path='/user/create/*'
                                    element={<CreateUserPage />}
                                />
                            </Route>
                            <Route path='/login' element={<LoginPage />} />
                        </Routes>
                    </QueryClientProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}

export default App;
