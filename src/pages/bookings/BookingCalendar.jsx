import { useMemo } from 'react'  
import { useNavigate } from 'react-router-dom'
import { useListBookingsQuery } from '../../modules/bookings/bookingsApi'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import dayjs from 'dayjs'                // déjà présent dans le projet ? sinon install: npm i dayjs
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

/** Transforme appointment_date + time -> ISO «YYYY-MM-DDTHH:mm:ss» */
const toIsoDateTime = (date, time = '00:00') => {
  if (!date) return undefined

  // DD/MM/YYYY ⟹ YYYY-MM-DD
  if (date.includes('/')) {
    const [d, m, y] = date.split('/')
    date = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }

  // ISO déjà complet ?
  if (date.includes('T')) return dayjs(date).format('YYYY-MM-DDTHH:mm:ss')

  return `${date}T${time.length === 5 ? `${time}:00` : time}`
}

/** Récupère la meilleure traduction d’un champ multilingue */
const getLocalized = (field, lang = 'fr') =>
  !field
    ? ''
    : typeof field === 'string'
      ? field
      : field[lang] ?? Object.values(field)[0] ?? ''

export default function BookingCalendar () {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { data: bookings = [], isLoading, error } = useListBookingsQuery()

  /* ----- événements FullCalendar (memo) ----- */
  const events = useMemo(() => {
    const durationMin = 30                                // <- change ici si besoin
    return bookings.map(b => {
      const startISO = toIsoDateTime(b.appointment_date, b.time)
      if (!startISO) return null

      const start = dayjs(startISO)
      const end   = start.add(durationMin, 'minute')

      return {
        id: b.id,
        title: `${getLocalized(b.service?.name, i18n.language)} • ${b.animal?.name ?? ''}`.trim()
                || t('booking.untitled', 'Réservation'),
        start: start.toISOString(),
        end:   end.toISOString(),
        backgroundColor: '#4caf50',
        borderColor:     '#4caf50',
        extendedProps: { booking: b },
      }
    }).filter(Boolean)
  }, [bookings, i18n.language, t])

  /* ------------- rendu ------------- */
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        {t('booking.calendar', 'Agenda des Réservations')}
      </Typography>

      {error && (
        <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
          <Typography color="error.main">
            {t('error.generic', 'Une erreur est survenue.')}
          </Typography>
        </Paper>
      )}

      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate('/bookings')}>
        {t('button.list', 'Retour à la liste')}
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locales={[frLocale]}
            locale="fr"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            height="auto"
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
            eventClick={({ event }) => navigate(`/bookings/${event.id}`)}
          />
        )}
      </Paper>
    </Box>
  )
}
