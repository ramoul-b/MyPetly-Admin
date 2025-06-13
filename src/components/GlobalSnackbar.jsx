import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../app/uiSlice'

export default function GlobalSnackbar() {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.ui.alert)

  const handleClose = () => {
    dispatch(hideAlert())
  }

  return (
    <Snackbar open={!!alert} autoHideDuration={3000} onClose={handleClose}>
      {alert && (
        <Alert severity={alert.type || 'error'} onClose={handleClose}>
          {alert.message}
        </Alert>
      )}
    </Snackbar>
  )
}
