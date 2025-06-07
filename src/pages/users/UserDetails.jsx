import {
  Box, Typography, Avatar, Chip, Stack, Divider, Button, Grid, Paper, IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserQuery } from '../../modules/users/usersApi'

export default function UserDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetUserQuery(id)

  if (isLoading) return <div>Chargement…</div>
  if (!data) return <div>Utilisateur introuvable</div>

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => nav('/users')}
        sx={{ mb: 2 }}
      >
        Retour
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            src={data.photo_url}
            alt={data.name}
            sx={{ width: 100, height: 100, boxShadow: 2 }}
          />
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700}>
              {data.name}
            </Typography>
            <Stack direction="row" spacing={1} mt={1} mb={2}>
              {data.roles?.map(role =>
                <Chip
                  key={role}
                  label={role}
                  icon={<VerifiedUserIcon />}
                  color="info"
                  size="small"
                />
              )}
              <Chip label={data.status === 'active' ? 'Actif' : 'Inactif'} color={data.status === 'active' ? 'success' : 'warning'} size="small" />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon color="primary" />
                  <Typography>{data.email || '--'}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <PhoneIcon color="secondary" />
                  <Typography>{data.phone || '--'}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><b>ID :</b> {data.id}</Typography>
                <Typography><b>Adresse :</b> {data.address || '--'}</Typography>
                <Typography><b>Créé le :</b> {data.created_at ? new Date(data.created_at).toLocaleDateString() : '--'}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>

      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => nav(`/users/${id}/edit`)}
        sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
      >
        Modifier
      </Button>
    </Box>
  )
}
