import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: function(resolve) {
            require(['../components/Home.vue'], resolve)
        }
    }, {
        path: '/test',
        component: function(resolve) {
            require(['../components/Lucky.vue'], resolve)
        }
    }]
})