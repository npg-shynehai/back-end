/**
 * Using for synchronous action
 */
import { MutationTree } from 'vuex';
import { PersonFormState } from './PersonFormState';
import { Person } from '@/models/Person';

export function setForm(state: PersonFormState, formData: Person) {
    state.form = formData;
}
export function setProcessing(state: PersonFormState, isLoading: boolean) {
    state.isProcessing = isLoading;
}
export default {
    setName(state: PersonFormState, name: string) {
        state.form.name = name;
    },
    setAge(state: PersonFormState, age: number) {
        state.form.age = age;
    },
    setComment(state: PersonFormState, comment: string) {
        state.form.comment = comment;
    },
    setForm,
    setProcessing,
} as MutationTree<PersonFormState>;
