import { Box, CircularProgress, Typography } from '@mui/material'

export default function AuthLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}
    >
      <CircularProgress color="primary" size={60} />
    </Box>
  )
}
