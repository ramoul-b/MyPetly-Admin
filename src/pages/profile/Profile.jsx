import { Box, Typography, Avatar, Chip, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { selectUser } from '../../modules/auth/authSlice'

export default function Profile() {
  const user = useSelector(selectUser)
  if (!user) return <Typography>Profile not found</Typography>

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar src={user.photo_url} alt={user.name} sx={{ width: 100, height: 100, boxShadow: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight={700}>{user.name}</Typography>
          <Typography>{user.email}</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            {user.roles?.map(role => (
              <Chip key={role} label={role} icon={<VerifiedUserIcon />} color="info" size="small" />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
