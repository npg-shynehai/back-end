/**
 * Using for synchronous action
 */
import { MutationTree } from 'vuex';
import { LangState } from './LangState';
import i18n from '@/i18n';

export function setLang(state: LangState, lang: string) {
    state.lang = lang;
    console.log("set Lang " + state.lang)
}
export default {
    setLang
} as MutationTree<LangState>;
