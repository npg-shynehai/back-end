import { Module } from 'vuex';
import { PersonFormState } from './PersonFormState';
import PersonFormGetters from './PersonFormGetters';
import PersonFormActions from './PersonFormActions';
import PersonFormMutations from './PersonFormMutations';

export class PersonFormModule implements Module<PersonFormState, any> {
    public state: PersonFormState;
    public getters = PersonFormGetters;
    public mutations = PersonFormMutations;
    public actions = PersonFormActions;
    constructor() {
        this.state = new PersonFormState();
    }
}
