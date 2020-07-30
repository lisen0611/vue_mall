import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login';
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import User from "./components/user/User";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome

                }, {
                    path: '/users',
                    component: User
                }
            ]
        },

    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const tokenStr = sessionStorage.getItem('token')
    if (!tokenStr) return next('/login');
    else next()
})

export default router