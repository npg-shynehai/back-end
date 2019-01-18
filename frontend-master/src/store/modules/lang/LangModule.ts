import { Module } from 'vuex';
import { LangState } from './LangState';
import ListTableGetters from './LangGetters';
import ListTableActions from './LangActions';
import ListTableMutations from './LangMutations';

export class LangModule implements Module<LangState, any> {
    public state: LangState;
    public getters = ListTableGetters;
    public mutations = ListTableMutations;
    public actions = ListTableActions;
    constructor() {
        this.state = new LangState();
    }
}
