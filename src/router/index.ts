import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import BookPage from '../views/BookPage.vue'
import BookSearch from '../views/BookSearch.vue'
import ReservedBooks from '../views/ReservedBooks.vue'
import MyReadLists from '../views/MyReadLists.vue'
import BooksInList from '../views/BooksInList.vue'
import LogInPage from '../views/UserLoginPage.vue'
import CreateAccountPage from '../views/CreateAccountPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile
  },
  {
    path: '/book',
    name: 'Book',
    component: BookPage
  },
  {
    path: '/search',
    name: 'Search',
    component: BookSearch
  },
  {
    path: '/reserved',
    name: 'Reserved',
    component: ReservedBooks
  },
  {
    path: '/myreadlists',
    name: 'MyReadLists',
    component: MyReadLists
  },
  {
    path: '/readlist',
    name: 'ReadList',
    component: BooksInList
  },
  {
    path: '/login',
    name: 'LogInPage',
    component: LogInPage
  },
  {
    path: '/create',
    name: 'CreateAccount',
    component: CreateAccountPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
