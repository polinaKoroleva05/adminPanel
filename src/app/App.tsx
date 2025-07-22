import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import './App.css';
import {Route, Routes} from 'react-router';
// import {MainPage} from '@pages/mainPage';
import {NewTaskPage} from '@/pages/newTaskPage';
import '@mantine/core/styles.css';
// import '@mantine/carousel/styles.css';
// import {EditTaskPage} from '@/pages/editTaskPage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const client = new QueryClient();
import {ModalsProvider} from '@mantine/modals';
import {MainUsersPage} from '@pages/mainUsersPage';
import {UsersTable} from '@widgets/usersTable';

function App() {
    return (
        <MantineProvider>
            <ModalsProvider>
                <QueryClientProvider client={client}>
                    <Routes>
                        <Route path='/' element={<MainUsersPage />}>
                            
                            <Route
                                path='/'
                                element={<UsersTable/>}
                            />
                            <Route
                                path='/user/edit'
                                element={<p>user edit</p>}
                            />
                            <Route
                                path='/user/create'
                                element={<p>user create</p>}
                            />
                        </Route>
                        <Route path='/login' element={<p>login</p>} />
                    </Routes>
                </QueryClientProvider>
            </ModalsProvider>
        </MantineProvider>
    );
}

export default App;
