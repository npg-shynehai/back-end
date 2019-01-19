import { Store, ActionTree, ActionContext } from 'vuex';
import { PersonFormState } from './PersonFormState';
import { Person } from '@/models/Person';
import { PersonService } from '@/services/PersonService';
import { MyHttpResponse } from '@/models/http/Response';
import index from '@/router';
import { Script } from 'vm';

export function save(store: ActionContext<PersonFormState, any>,
    formData: Person) {
    store.commit('setProcessing', true);
    return new PersonService().save(formData)
        .then((resp) => {
            // Thêm mới thành công thì sẽ làm TODO
            store.commit('add', resp.data.data);
        }).catch(e => {
            // Nếu sinh lỗi 
            index.push('/server-error')
        }).finally(() => {
            store.commit('setProcessing', false);
        })
}

export function saveperson(store: ActionContext<PersonFormState, any>,
    formData: Person) {
    store.commit('setProcessing', true);
    return new PersonService().save(formData)
        .then((resp) => {
            // Thêm mới thành công thì sẽ làm TODO
            store.dispatch('initperson', resp.data.data);
        }).catch(e => {
            // Nếu sinh lỗi 
            index.push('/server-error')
        }).finally(() => {
            store.commit('setProcessing', false);
        })
}
export function upAge(store: ActionContext<PersonFormState, any>, params?: any) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
    return new PersonService().up(params).then((resp) => {
        // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
        store.commit('setTableUpAge', params[1]);
    }).catch(e => {
        // Nếu sinh lỗi 
        index.push('/server-not-found')
    }).finally(() => {
        console.log('upAge')
    })
}

export function downAge(store: ActionContext<PersonFormState, any>, params?: any) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
    return new PersonService().down(params).then((resp) => {
        // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
        console.log(params[1])
        store.commit('setTableDownAge', params[1]);
        console.log(params[1])
    }).catch(e => {
        // Nếu sinh lỗi 
        index.push('/server-not-found')
    }).finally(() => {
        console.log('dowAge')
    })
}


export function deletePerson(store: ActionContext<PersonFormState, any>, params?: any) {
    // store.commit('DELETE_PARTICLE_DATA', 'Deleting all particles');
    return new PersonService().delete(params).then((resp) => {
        // Xóa thành công thì sẽ làm TODO lấy id record mới xóa
        store.dispatch('initperson');
    }).catch(e => {
        // Nếu sinh lỗi 
        index.push('/server-not-found')
    }).finally(() => {
        console.log('delete')
    })
}
export default {
    save,
    saveperson,
    upAge,
    downAge,
    deletePerson,
} as ActionTree<PersonFormState, any>;
