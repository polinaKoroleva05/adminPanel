import {getUserQueryMiddleware} from '@/app/taskStore/userQueryMiddleware';
import type {UserCreateInterface, UserInterface} from '@/shared/model/types';
import {UserDetailsMantine} from '@widgets/userDetails';
import {Route, Routes, useNavigate} from 'react-router';
import styles from './createUserPage.module.css';

export default function CreateUserPage() {
    const navigate = useNavigate();
    const emptyUser: UserInterface = {
        id: '',
        name: '',
        surName: '',
        password: '',
        fullName: '',
        email: '',
    };
    const {createUserMutation} = getUserQueryMiddleware();
    function handleCreateTask(userData: UserCreateInterface) {
        console.log('handle create', userData)
        createUserMutation(userData);
        navigate('/');
    }
    return (
        <div className={styles.page}>
            <Routes>
                <Route
                    path='mantine'
                    element={
                        <UserDetailsMantine
                            currentUser={emptyUser}
                            onSubmitProp={handleCreateTask}
                            onCancelProp={() => navigate('/')}
                            editMode={false}
                        />
                    }
                />
                <Route path='formik' element={<p>formik</p>} />
                <Route path='reactHookForm' element={<p>reactHookForm</p>} />
            </Routes>
        </div>
    );
}
