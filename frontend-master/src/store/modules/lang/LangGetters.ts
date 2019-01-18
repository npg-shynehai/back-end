import { Getter, GetterTree } from 'vuex';
import { LangState }  from './LangState';

/** Should remove, because we can not change directly properties on form state */
export function getlang(state: LangState) {
    console.log("Get Lang " +  state.lang)
    return state.lang;
}
export default {
    getlang
} as GetterTree<LangState, any>;
