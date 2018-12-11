import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue';


Vue.use(Router)


const publicPages = ['/login'];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            component: Login
        },
        
  ]
})

router.beforeEach((to, from, next) => {
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
})

export default router;
