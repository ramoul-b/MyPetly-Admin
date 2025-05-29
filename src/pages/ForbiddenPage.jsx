// src/pages/ForbiddenPage.jsx
import { useTranslation } from 'react-i18next'

export default () => {
  const { t } = useTranslation()
  return <h1>{t('access.forbidden')}</h1>
}
