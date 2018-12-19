import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue';
import Assign from '@/views/Assign.vue';
import Deassign from '@/views/Deassign.vue';
import Input from '@/views/Input.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            anonymous: true
        },
        {
            path: '/error',
            name: 'error',
            component: Login,
            anonymous: true
        },
        {
            path: '/assign',
            name: 'assign',
            item_required: false,
            component: Assign
        },
        {
            path: '/deassign',
            name: 'deassign',
            item_required: true,
            component: Deassign
        },
        {
            path: '/input',
            name: 'input',
            item_required: true,
            component: Input
        },
        {
            path: '/logout',
            name: 'logout',
            component: Login
        },
  ]
})

router.beforeEach((to, from, next) => {

    var route = router.options.routes.find(route => route.path === to.path)

    if (!route) {
        return next('/login');
    }

    const loggedIn = localStorage.getItem('token');
    if (!route.anonymous && !loggedIn) {
        return next('/login');
    }

    const hasItem = localStorage.getItem('item');
    console.log(hasItem);
    if (route.item_required == true && !hasItem) {
        return next('/error');
    }
    if (route.item_required == false && hasItem) {
        return next('/error');
    }

    next();
})

export default router;
