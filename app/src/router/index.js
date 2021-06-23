import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signin.vue'),
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token') || false;
      if (!token) {
        next();
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result == null) {
              next();
            } else {
              next({ name: 'Appointment' });
            }
          })
      }
    }
  }
  ,
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token') || false;
      if (!token) {
        next();
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result == null) {
              next();
            } else {
              next({ name: 'Appointment' });
            }
          })
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token') || false;
      if (!token) {
        next({ name: 'Signin' });
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result == null) {
              next({ name: 'Signin' });
            } else {
              next();
            }
          })
      }
    }
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: () => import(/* webpackChunkName: "appointment" */ '@/views/Appointment.vue'),
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token') || false;
      if (!token) {
        next({ name: 'Signin' });
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result == null) {
              next({ name: 'Signin' });
            } else {
              next();
            }
          })
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
