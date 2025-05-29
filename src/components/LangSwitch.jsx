import { useTranslation } from 'react-i18next'
import { MenuItem, Select } from '@mui/material'

export default function LangSwitch () {
  const { i18n } = useTranslation()
  return (
    <Select
      size="small"
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      sx={{
    bgcolor: 'rgba(255,255,255,0.11)',
    color: '#fff',
    fontWeight: 600,
    mr: 1
  }}
    >
      <MenuItem value="fr">FR</MenuItem>
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="it">IT</MenuItem>
    </Select>
  )
}
