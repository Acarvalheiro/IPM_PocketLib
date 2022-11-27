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
import Libraries from '../views/LibrariesPage.vue'
import Notifications from '../views/NotificationsPage.vue'
import QRcode from '../views/QRCodePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
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
    path: '/book/:bookId',
    name: 'Book',
    component: BookPage
  },
  {
    path: '/search/:input',
    name: 'Search',
    component: BookSearch
  },
  {
    path: '/reserved',
    name: 'Reserved',
    component: ReservedBooks
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/myreadlists',
    name: 'MyReadLists',
    component: MyReadLists
  },
  {
    path: '/readlist/:listId',
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
  },
  {
    path: '/libraries/:bookId',
    name: 'Libraries',
    component: Libraries
  },
  {
    path: '/qrCodePage',
    name: 'QRcode',
    component: QRcode
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
