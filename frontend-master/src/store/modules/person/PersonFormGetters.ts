import { Getter, GetterTree } from 'vuex';
import { PersonFormState } from './PersonFormState';

/** Should remove, because we can not change directly properties on form state */
export function formData(state: PersonFormState) {
    return state.form;
}

export function isProcessing(state: PersonFormState) {
    return state.isProcessing;
}
export default {
    formData,
    isProcessing,
} as GetterTree<PersonFormState, any>;
