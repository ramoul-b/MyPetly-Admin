import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../modules/auth/authApi'
import authReducer from '../modules/auth/authSlice'
import { animalsApi } from '../modules/animals/animalsApi'
import { profileApi } from '../modules/profile/profileApi'

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    auth: authReducer
  },
  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      animalsApi.middleware,
      profileApi.middleware
    )
})
