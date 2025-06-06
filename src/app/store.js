import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../modules/auth/authApi'
import authReducer from '../modules/auth/authSlice'
import { animalsApi } from '../modules/animals/animalsApi'
import { providerApi } from '../modules/provider/providerApi'

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
    auth: authReducer
  },
  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      animalsApi.middleware,
      providerApi.middleware
    )
})
