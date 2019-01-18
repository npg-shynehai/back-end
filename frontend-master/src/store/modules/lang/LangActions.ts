import { Store, ActionTree, ActionContext } from 'vuex';
import { LangState } from './LangState';
import i18n from '@/i18n';

export function changeLang(store: ActionContext<LangState, any>,
                     params?: any) {
    i18n.locale = params
    console.log('Lang Action '+params)
    store.commit('setLang', params);
}
export default {
    changeLang
} as ActionTree<LangState, any>;
