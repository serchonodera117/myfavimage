import { createWebHistory,  createRouter} from "vue-router";
import registro from "../views/registro.vue";
import home from "../views/home.vue";
import everything from "../views/everything.vue";
import chat from "../views/chat.vue";
import profile from "../views/profile.vue";
import post from "../views/post.vue";


const routes = [
    {
        path: '/registro',
        name: 'registro',
        component: registro
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
         path: '/everything',
         name: 'everything',
        component: everything
    },
    {
        path: '/chat',
        name: 'chat',
        component: chat
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile
    },{
        path: '/post',
        name: 'post',
        component: post
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
