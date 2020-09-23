import Vue from 'vue'
import Vuex from 'vuex'

import operation from "./operation";
import {RootState} from "@/store/types";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    modules: {
        operation,
    }
})
