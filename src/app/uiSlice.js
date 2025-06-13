import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'ui',
  initialState: { alert: null },
  reducers: {
    showAlert: (state, { payload }) => {
      state.alert = payload
    },
    hideAlert: (state) => {
      state.alert = null
    }
  }
})

export const { showAlert, hideAlert } = slice.actions
export default slice.reducer
