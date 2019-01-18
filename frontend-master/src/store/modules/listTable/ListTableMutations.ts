/**
 * Using for synchronous action
 */
import { MutationTree } from 'vuex';
import { ListTableState } from './ListTableState';

export function prepend(state: ListTableState, items: any[]) {
    state.items = state.items.concat(items);
}

export function append(state: ListTableState, items: any[]) {
    state.items = state.items.concat(items);
}
export function add(state: ListTableState, items: any[]) {
    state.items.splice(state.items.length - 1, 1);
    state.items.splice(0, 0, items);
}
export function deletePerson(state: ListTableState, index: number) {
      state.items.splice(index, 1);
}

export function setTableUpAge(state: ListTableState, index: number) {
    state.items[index].age = parseInt(state.items[index].age) + 1;
}

export function setTableDownAge(state: ListTableState, index: number) {
    state.items[index].age = parseInt(state.items[index].age) - 1;
}

export function setTableProcessing(state: ListTableState, isLoading: boolean) {
    state.isProcessing = isLoading;
}
export function setCurrentPage(state: ListTableState, currentPage: number) {
    state.currentPage = currentPage;
}
export function setTotalPage(state: ListTableState, totalPage: number) {
    state.totalPage = totalPage;
}
export function setIdMin(state: ListTableState, id: number) {
    state.idMin = id;
}
export function setMore(state: ListTableState, isMore: boolean) {
    state.isMore = isMore;
}
export default {
    prepend,
    add,
    deletePerson,
    setTableUpAge,
    setTableDownAge,
    append,
    setTableProcessing,
    setTotalPage,
    setCurrentPage,
    setIdMin,
    setMore,
} as MutationTree<ListTableState>;
