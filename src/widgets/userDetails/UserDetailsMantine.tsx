import type {UserCreateInterface, UserInterface} from '@shared/model/types';
import {
    Button,
    Group,
    TextInput,
    Paper,
    Select,
    Checkbox,
    PasswordInput
} from '@mantine/core';
import {DatePickerInput} from '@mantine/dates';
import {useForm} from '@mantine/form';
import styles from './UserDetails.module.css';
import {format} from 'date-fns';

/**
 * A functional React component that displays form filled with task data, allows you to edit fields.
 * @param {TaskInterface} currentTask - The task whose data needs to be displayed.
 * @param {(taskData: TaskInterface) => void} onSubmitProp - Action to be called when the submit button is pressed.
 * @param {() => void} onCancelProp - Action to be called when the cancel button is pressed.
 * @returns {React.Element} A React element displaying the form of task details.
 */
export default function userDetailsMantine({
    currentUser,
    onSubmitProp,
    onCancelProp,
    editMode
}: {
    currentUser: UserInterface;
    onSubmitProp: (userData: UserCreateInterface) => void;
    onCancelProp: () => void;
    editMode: boolean;
}) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: currentUser.name,
            surName: currentUser.surName,
            password: currentUser.password,
            confirmPassword: currentUser.password,
            fullName: currentUser.fullName,
            email: currentUser.email,
            birthDate: currentUser.birthDate,
            telephone: currentUser.telephone,
            employment: currentUser.employment,
            userAgreement: currentUser.userAgreement
        },

        validate: {
            name: (value) =>
                value.length < 64 && value.length > 0
                    ? null
                    : "Name can't be empty and more 64 symbols",
            surName: (value) =>
                value.length < 64 && value.length > 0
                    ? null
                    : "Surname can't be empty and more 64 symbols",
            password: (value) =>
                value == undefined || value.length > 0
                    ? null
                    : "Password can't be empty",
            confirmPassword: (value, values) =>
                value === values.password ? null : 'Password did not match',

            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            telephone: (value) =>
                value == undefined || /^(\+7|8)[89]\d{9}$/.test(value)
                    ? null
                    : 'Invalid telephone' //если телефон не определен, то регулярка выполнится с true
        }
    });
    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        // form.setFieldValue('name', event.currentTarget.value);
        form.setFieldValue(
            'fullName',
            event.currentTarget.value + ' ' + form.getValues().surName
        );
    }

    function handleBlurName(event: React.ChangeEvent<HTMLInputElement>) {
        form.setFieldValue('name', event.currentTarget.value);
    }

    function handleSurNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        // form.setFieldValue('surName', event.currentTarget.value);
        form.setFieldValue(
            'fullName',
            form.getValues().name + ' ' + event.currentTarget.value
        );
    }

    function handleBlurSurName(event: React.ChangeEvent<HTMLInputElement>) {
        form.setFieldValue('surName', event.currentTarget.value);
    }

    return (
        <Paper className={styles.form} shadow='md' radius='md'>
            <form onSubmit={form.onSubmit(onSubmitProp)}>
                <TextInput
                    withAsterisk
                    label='Name'
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    onChange={handleNameChange}
                    onBlur={handleBlurName}
                />
                <TextInput
                    withAsterisk
                    label='Surname'
                    key={form.key('surName')}
                    {...form.getInputProps('surName')}
                    onChange={handleSurNameChange}
                    onBlur={handleBlurSurName}
                />
                <TextInput
                    withAsterisk
                    label='Fullname'
                    key={form.key('fullName')}
                    {...form.getInputProps('fullName')}
                />
                {!editMode && (
                    <>
                        <PasswordInput
                            withAsterisk
                            label='Password'
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        <PasswordInput
                            withAsterisk
                            label='Confirm password'
                            key={form.key('confirmPassword')}
                            {...form.getInputProps('confirmPassword')}
                        />
                    </>
                )}
                <TextInput
                    disabled={editMode}
                    withAsterisk
                    label='Email'
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <DatePickerInput
                    label='Birth date'
                    key={form.key('birthDate')}
                    {...form.getInputProps('birthDate')}
                />
                <TextInput
                    label='Telephone'
                    key={form.key('telephone')}
                    {...form.getInputProps('telephone')}
                />
                <Select
                    searchable
                    label='Employment'
                    key={form.key('employment')}
                    {...form.getInputProps('employment')}
                    data={['Сleaner', 'Admin', 'Director', 'Workman']}
                />
                <Checkbox
                    label='User agreement'
                    key={form.key('userAgreement ')}
                    {...form.getInputProps('userAgreement ')}
                />

                <Group justify='flex-end' mt='md'>
                    <Button type='submit'>Save</Button>
                    <Button color='#a6a6a6ff' onClick={onCancelProp}>
                        Cancel
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
