const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./components/fullpage/index.vue'], resolve)
}];
export default routers;