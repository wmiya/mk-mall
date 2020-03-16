import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/pages/GoodsList'

Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        name: 'GoodsList',
        meta: {
            title: '商城首页',
            login_require: false
        },
        component: GoodsList
    }]
})