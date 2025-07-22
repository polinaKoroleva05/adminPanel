// import {getTaskQueryMiddleware} from '@store/taskQueryMiddleware';
import type {UserInterface} from '@/shared/model/types';
import {UserDetailsMantine} from '@widgets/userDetails';
import {Route, Routes, useNavigate} from 'react-router';
import styles from './createUserPage.module.css';

export default function NewTaskPage() {
    const navigate = useNavigate();
    const emptyUser: UserInterface = {
        id: 3,
        name: 'string',
        surName: 'string',
        password: 'string',
        fullName: 'string',
        email: 'string',
        birthDate: '2025-07-16T20:58:15.998Z',
        telephone: 'string',
        employment: 'string',
        userAgreement: true
    };
    // const {createTaskMutation} = getTaskQueryMiddleware();
    function handleCreateTask(userData: UserInterface) {
        console.log('handle create', userData)
        // createTaskMutation(userData);
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
