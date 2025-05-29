// src/pages/NotFoundPage.jsx
import { useTranslation } from 'react-i18next'

export default () => {
  const { t } = useTranslation()
  return <h1>{t('page.not_found')}</h1>
}
