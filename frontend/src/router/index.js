import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Admin/Login.vue'
import Register from '../views/Admin/Register.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import Surveys from '../views/Admin/Surveys.vue'
import SurveyView from '../views/Admin/SurveyView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from '../store';

const routes = [
  
  {
    path: '/',
    redirect : '/dashboard',
    component : DefaultLayout,
    meta : {requiresAuth : true},
    children : [
      {path : '/dashboard' , name: 'Dashboard' , component : Dashboard},
      {path : '/surveys' , name: 'Surveys' , component : Surveys},
      {path : '/surveys/create' , name: 'SurveyCreate' , component : SurveyView},
      {path : '/surveys/:id' , name: 'SurveyView' , component : SurveyView},
    ]
  },
  {
    path: '/auth',
    redirect : '/login',
    name : 'Auth',
    meta : {isGuest : true},
    component : AuthLayout,
    children : [
      {
        path: '/register',
        name: "Register",
        component : Register,
      },
      {
        path: '/login',
        name: "Login",
        component : Login,
      },
    ]
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name : 'Login'})
  }else if(store.state.user.token && (to.meta.isGuest)){
    next({name : 'Dashboard'})
  }else{
    next()
  }
})

export default router
