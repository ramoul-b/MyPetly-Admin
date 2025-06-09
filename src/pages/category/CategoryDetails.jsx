import { Box, Typography, Stack, Button, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCategoryQuery } from '../../modules/services/categoriesApi'
import { useTranslation } from 'react-i18next'

export default function CategoryDetails() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetCategoryQuery(id)
  const { t, i18n } = useTranslation()

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>{t('category.not_found', 'Category not found')}</div>

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button variant="outlined" onClick={() => nav('/categories')} sx={{ mb: 2 }}>
        {t('button.back', 'Back')}
      </Button>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {data.name?.[i18n.language] || data.name?.en}
        </Typography>
        <Stack spacing={1} mt={2}>
          {data.icon && <Typography>Icon: {data.icon}</Typography>}
          {data.color && <Typography>Color: {data.color}</Typography>}
        </Stack>
      </Paper>
      <Button
        variant="contained"
        onClick={() => nav(`/categories/${id}/edit`)}
        sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
      >
        {t('button.edit', 'Edit')}
      </Button>
    </Box>
  )
}
