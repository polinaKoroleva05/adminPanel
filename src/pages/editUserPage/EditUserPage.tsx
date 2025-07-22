import {Route, Routes, useNavigate, useParams} from 'react-router';
import {UserDetailsMantine} from '@widgets/userDetails';
import type {UserCreateInterface} from '@/shared/model/types';
import {getUserQueryMiddleware} from '@/app/taskStore/userQueryMiddleware';
import {useIdUserQuery} from '@/app/taskStore';
import {Loader} from '@mantine/core';
import styles from './editUserPage.module.css';

export default function EditUserPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    if(!id){
        return <p> Not Found :c </p>;
    }
    const {data: currentUser, isLoading} = useIdUserQuery(id);
    const {editUserMutation} = getUserQueryMiddleware();
    console.log(currentUser)
    if (isLoading) {
        return <Loader />;
    }
    if (!currentUser) {
        return <p> Not Found :c </p>;
    }
    function handleEditUser(userData: UserCreateInterface) {
        const { password, email, ...userEditData } = userData
        editUserMutation({id: id!, dataUser: userEditData})
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
