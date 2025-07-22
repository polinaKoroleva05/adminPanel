import type {TaskInterface, UserInterface} from '@shared/model/types';
import {
    Button,
    Group,
    SegmentedControl,
    Textarea,
    Text,
    TextInput,
    Paper
} from '@mantine/core';
import {useForm} from '@mantine/form';
import styles from './taskDetails.module.css';
import {format} from 'date-fns';

/**
 * A functional React component that displays form filled with task data, allows you to edit fields.
 * @param {TaskInterface} currentTask - The task whose data needs to be displayed.
 * @param {(taskData: TaskInterface) => void} onSubmitProp - Action to be called when the submit button is pressed.
 * @param {() => void} onCancelProp - Action to be called when the cancel button is pressed.
 * @returns {React.Element} A React element displaying the form of task details.
 */
// export default function userDetailsFormik({
//     currentUser,
//     onSubmitProp,
//     onCancelProp
// }: {
//     currentUser: UserInterface;
//     onSubmitProp: (userData: UserInterface) => void;
//     onCancelProp: () => void;
// }) {
// }
