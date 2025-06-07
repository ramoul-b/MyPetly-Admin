import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../modules/auth/authApi'
import authReducer from '../modules/auth/authSlice'
import { animalsApi } from '../modules/animals/animalsApi'
import { usersApi } from '../modules/users/usersApi'
import { providerApi } from '../modules/provider/providerApi'
import { rolesApi } from '../modules/roles/rolesApi'

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    auth: authReducer
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(authApi.middleware, animalsApi.middleware)
      .concat(usersApi.middleware)
      .concat(providerApi.middleware)
      .concat(rolesApi.middleware)
})
