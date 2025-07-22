import {Route, Routes, useNavigate, useParams} from 'react-router';
import {UserDetailsMantine} from '@widgets/userDetails';
import type {TaskInterface, UserInterface} from '@/shared/model/types';
import {getTaskQueryMiddleware} from '@store/taskQueryMiddleware';
import {useIdTaskQuery} from '@store/useIdTaskQuery';
import {Loader} from '@mantine/core';
import styles from './editUserPage.module.css';

export default function EditTaskPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    // const {data: currentTask, isLoading} = useIdTaskQuery(Number(id));
    // const {updateTaskMutation} = getTaskQueryMiddleware();
    // if (isLoading) {
    //     return <Loader />;
    // }
    // if (!currentTask) {
    //     return <p> Not Found :c </p>;
    // }
    const currentUser: UserInterface = {
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
    function handleEditUser(userData: UserInterface) {
        // let patchData: Partial<TaskInterface> = {}; //только измененные данные
        // for (let field in taskData) {
        //     if (taskData[field] !== currentTask[field]) {
        //         patchData[field] = taskData[field];
        //     }
        // }
        // if (Object.keys(patchData).length) {
        //     updateTaskMutation({id: Number(id), newTask: patchData});
        // }
        console.log('handleEditUser', userData)
        navigate('/');
    }
    return (
        <div className={styles.page}>
            <Routes>
                <Route
                    path='/mantine'
                    element={
                        <UserDetailsMantine
                            currentUser={currentUser}
                            onSubmitProp={handleEditUser}
                            onCancelProp={() => navigate('/')}
                            editMode={true}
                        />
                    }
                />
                <Route path='/formik' element={<p>formik</p>} />
                <Route path='/reactHookForm' element={<p>reactHookForm</p>} />
            </Routes>
        </div>
    );
}
