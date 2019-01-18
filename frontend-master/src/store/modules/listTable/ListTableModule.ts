import { Module } from 'vuex';
import { ListTableState } from './ListTableState';
import ListTableGetters from './ListTableGetters';
import ListTableActions from './ListTableActions';
import ListTableMutations from './ListTableMutations';

export class ListTableModule implements Module<ListTableState, any> {
    public state: ListTableState;
    public getters = ListTableGetters;
    public mutations = ListTableMutations;
    public actions = ListTableActions;
    constructor() {
        this.state = new ListTableState();
    }
}
