import type {TaskInterface, UserInterface} from '@shared/model/types';
import {
    Button,
    Group,
    SegmentedControl,
    Textarea,
    Text,
    TextInput,
    Paper,
    Select,
    Checkbox
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
    onSubmitProp: (userData: UserInterface) => void;
    onCancelProp: () => void;
    editMode: boolean;
}) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: currentUser.id,
            name: currentUser.name,
            surName: currentUser.surName,
            password: currentUser.password,
            fullName: currentUser.fullName,
            email: currentUser.email,
            birthDate: currentUser.birthDate,
            telephone: currentUser.telephone,
            employment: currentUser.employment,
            userAgreement: currentUser.userAgreement
        },

        validate: {
            name: (value) =>
                value.length < 64 ? null : "Name can't be more 64 symbols"
        }
    });
    return (
        <Paper className={styles.form} shadow='md' radius='md'>
            <form onSubmit={form.onSubmit(onSubmitProp)}>
                <TextInput
                    withAsterisk
                    label='Name'
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label='Surname'
                    key={form.key('surName')}
                    {...form.getInputProps('surName')}
                />
                <TextInput
                    withAsterisk
                    label='Fullname'
                    key={form.key('fullName')}
                    {...form.getInputProps('fullName')}
                />
                <TextInput
                    disabled={editMode}
                    withAsterisk
                    label='Password'
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
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
                    label='Employment '
                    key={form.key('employment ')}
                    {...form.getInputProps('employment ')}
                    data={['React', 'Angular', 'Vue', 'Svelte']}
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
