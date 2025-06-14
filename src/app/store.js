import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../modules/auth/authApi'
import authReducer from '../modules/auth/authSlice'
import { animalsApi } from '../modules/animals/animalsApi'
import { profileApi } from '../modules/profile/profileApi'
import { usersApi } from '../modules/users/usersApi'
import { providerApi } from '../modules/provider/providerApi'
import { rolesApi } from '../modules/roles/rolesApi'
import { servicesApi } from '../modules/services/servicesApi'
import { providerServicesApi } from '../modules/providerServices/providerServicesApi'
import { collarsApi } from '../modules/collars/collarsApi'
import { bookingsApi } from '../modules/bookings/bookingsApi'
import { categoriesApi } from '../modules/services/categoriesApi'
import uiReducer from './uiSlice'

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [providerServicesApi.reducerPath]: providerServicesApi.reducer,
    [collarsApi.reducerPath]: collarsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    auth: authReducer,
    ui: uiReducer
  },
  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      animalsApi.middleware,
      profileApi.middleware
    ).concat(usersApi.middleware)
      .concat(providerApi.middleware)
      .concat(rolesApi.middleware)
      .concat(servicesApi.middleware)
      .concat(providerServicesApi.middleware)
      .concat(collarsApi.middleware)
      .concat(bookingsApi.middleware)
      .concat(categoriesApi.middleware)
})
