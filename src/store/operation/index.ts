import FieldService from "@/FieldService.ts";
import Operation from "@/models/Operation";
import {Module} from "vuex";
import {RootState} from "@/store/types";

const fieldService = new FieldService();

interface OperationState {
    list: Array<Operation>;
    loading: boolean;
}

const operation: Module<OperationState, RootState> = {
    namespaced: true,
    state: () => ({
        list: [],
        loading: false,
    }),
    getters: {
        GET_LIST(state) {
            return state.list;
        },
        IS_LOADING(state) {
            return state.loading;
        },
    },
    actions: {
        async load({commit}) {
            commit("LOADING", true);
            const list = await fieldService.getOperations();
            commit('SET_LIST', list);
            commit("LOADING", false);
            return list;
        },
        create({commit}, payload: Operation) {
            return fieldService.saveOperation(payload);
        },
    },
    mutations: {
        LOADING(state, payload) {
            state.loading = payload;
        },
        SET_LIST(state, payload: Array<Operation>) {
            state.list = payload;
        },
    },
}

export default operation;
