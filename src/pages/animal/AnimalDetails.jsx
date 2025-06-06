import {
  Box, Typography, Avatar, Chip, Stack, Divider, Button, Grid, Paper, IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import EventIcon from '@mui/icons-material/Event'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useGetAnimalQuery } from '../../modules/animals/animalsApi'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import { Switch } from '@mui/material'
import getPhotoUrl from '../../utils/getPhotoUrl'

export default function AnimalDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetAnimalQuery(id)
  const location = useLocation()
  const updatedPhoto = location.state?.updatedPhoto

  if (isLoading) return <div>Chargement…</div>
  if (!data) return <div>Animal introuvable</div>

  const healthHistory = data.health_history || []
  const upcomingEvents = data.upcoming_events || []
  const pastEvents = data.past_events || []

  // === CARD COMPONENTS ===

  const CardBlock = ({ icon, title, color, children, action = null }) => (
    <Paper elevation={3} sx={{
      borderRadius: 4, width: '100%', overflow: 'hidden', minHeight: 240, display: 'flex', flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{
        bgcolor: color, px: 3, py: 2, display: 'flex',
        alignItems: 'center', borderBottom: '1px solid #e0e7ef', justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <Typography variant="subtitle1" fontWeight={700} sx={{ ml: 1, color: '#234' }}>
            {title}
          </Typography>
        </Box>
        {action}
      </Box>
      {/* Contenu */}
      <Box sx={{ px: 3, py: 2, flex: 1 }}>
        {children}
      </Box>
    </Paper>
  )

  // === LAYOUT ===

  return (
    <Box sx={{ maxWidth: 1150, mx: 'auto', mt: 4, mb: 6 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => nav('/animals')}
        sx={{ mb: 2 }}
      >
        Retour
      </Button>

      {/* Card principale */}
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4, mb: 4 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center">
          <Avatar
          src={updatedPhoto || data.photo_url}
          alt="photo"
          sx={{ width: 110, height: 110, boxShadow: 2 }}
        />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={700}>{data.name}</Typography>
            <Stack direction="row" spacing={1} mt={1} mb={2}>
              <Chip label={data.species} />
              {data.breed && <Chip label={data.breed} color="info" />}
              <Chip label={data.status} color={data.status === 'active' ? 'success' : 'warning'} />
              {data.collar_type && (
                <Chip label={data.collar_type} icon={<VaccinesIcon />} color="primary" />
              )}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><b>ID :</b> {data.identification_number || '--'}</Typography>
                <Typography><b>Naissance :</b> {data.birthdate || '--'}</Typography>
                <Typography><b>Sexe :</b> {data.sex || '--'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><b>Poids :</b> {data.weight || '--'} kg</Typography>
                <Typography><b>Taille :</b> {data.height || '--'} cm</Typography>
                <Typography><b>Couleur :</b> {data.color || '--'}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>

      {/* Lignes de cards */}
      <Stack spacing={3}>
        {/* Ligne 1 */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {/* Infos santé + Statistiques santé groupées */}
         <CardBlock
            icon={<FavoriteIcon sx={{ color: '#1565c0' }} />}
            title="Infos santé & Statistiques santé"
            color="#e3f2fd"
          >
            {/* Infos santé */}
            <Typography variant="body2" fontWeight={700} mb={1}>Infos santé</Typography>
            <Stack spacing={2} mb={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <VaccinesIcon sx={{ color: data.vaccinated ? 'green' : 'red' }} />
                <Typography flex={1}>Vacciné</Typography>
                <Switch checked={!!data.vaccinated} disabled color="success" />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BloodtypeIcon sx={{ color: data.neutered ? 'green' : 'red' }} />
                <Typography flex={1}>Stérilisé</Typography>
                <Switch checked={!!data.neutered} disabled color="success" />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircleIcon sx={{ color: data.microchipped ? 'green' : 'red' }} />
                <Typography flex={1}>Pucé</Typography>
                <Switch checked={!!data.microchipped} disabled color="success" />
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Statistiques santé */}
            <Typography variant="body2" fontWeight={700} mb={1}>Statistiques santé</Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <ThermostatIcon color="error" />
                <Typography flex={1}>Température</Typography>
                <Typography fontWeight={700}>{data.temperature ?? '--'} <span style={{ fontWeight: 400 }}>°C</span></Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <MonitorHeartIcon color="error" />
                <Typography flex={1}>Tension artérielle</Typography>
                <Typography fontWeight={700}>{data.blood_pressure ?? '--'} <span style={{ fontWeight: 400 }}>mmHg</span></Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <FavoriteIcon color="error" />
                <Typography flex={1}>Rythme cardiaque</Typography>
                <Typography fontWeight={700}>{data.heart_rate ?? '--'} <span style={{ fontWeight: 400 }}>bpm</span></Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DirectionsRunIcon color="error" />
                <Typography flex={1}>Activité</Typography>
                <Typography fontWeight={700}>{data.activity ?? '--'} <span style={{ fontWeight: 400 }}>pas</span></Typography>
              </Stack>
            </Stack>
          </CardBlock>


          {/* Historique santé */}
          <CardBlock
            icon={<MedicalServicesIcon sx={{ color: '#7e57c2' }} />}
            title="Historique santé"
            color="#ede7f6"
            action={
              <IconButton size="small" color="primary" title="Ajouter un événement">
                <AddCircleOutlineIcon />
              </IconButton>
            }
          >
            {healthHistory.length === 0 ? (
              <Typography color="text.disabled">Aucun événement</Typography>
            ) : (
              <Stack spacing={1}>
                {healthHistory.map((item, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <MedicalServicesIcon fontSize="small" color="primary" />
                    <Typography>
                      <b>{item.title}</b> — {item.date}
                      <span style={{ color: '#888', marginLeft: 8 }}>{item.note}</span>
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardBlock>
        </Stack>
        {/* Ligne 2 */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {/* Évènements à venir */}
          <CardBlock
            icon={<EventIcon sx={{ color: '#43a047' }} />}
            title="Évènements à venir"
            color="#e8f5e9"
            action={
              <IconButton size="small" color="primary" title="Ajouter un événement">
                <AddCircleOutlineIcon />
              </IconButton>
            }
          >
            {upcomingEvents.length === 0 ? (
              <Typography color="text.disabled">Aucun événement</Typography>
            ) : (
              <Stack spacing={1}>
                {upcomingEvents.map((event, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <EventIcon fontSize="small" color="secondary" />
                    <Typography>
                      <b>{event.label}</b> — {event.date}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardBlock>
          {/* Évènements passés */}
          <CardBlock
            icon={<EventIcon sx={{ color: '#fb8c00' }} />}
            title="Évènements passés"
            color="#fff3e0"
          >
            {pastEvents.length === 0 ? (
              <Typography color="text.disabled">Aucun événement</Typography>
            ) : (
              <Stack spacing={1}>
                {pastEvents.map((event, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <EventIcon fontSize="small" color="action" />
                    <Typography>
                      <b>{event.label}</b> — {event.date}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardBlock>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => nav(`/animals/${id}/edit`)}
        sx={{ mt: 4, minWidth: 180, fontWeight: 700, fontSize: 16 }}
      >
        Modifier
      </Button>
    </Box>
  )
}
