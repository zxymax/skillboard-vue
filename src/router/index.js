import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/Login';
import LogoutView from '../views/Logout';
import UserView from '../views/User';
import HomeView from '../views/Home';
import SearchView from '../views/Search';
import AboutView from '../views/About';
// import store from '../store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/logout',
        name: 'logout',
        component: LogoutView,
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView,
    },
    {
        path: '/users/:id',
        name: 'user',
        component: UserView,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach();

export default router;
