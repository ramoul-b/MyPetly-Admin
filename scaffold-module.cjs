#!/usr/bin/env node

// scaffold-module.cjs
const fs = require('fs')
const path = require('path')

const moduleName = process.argv[2]
if (!moduleName) {
  console.log('Usage: node scaffold-module.cjs <moduleName>')
  process.exit(1)
}
const Module = moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
const Modules = Module + 's'

// Dossiers cibles
const modulesDir = path.join(__dirname, 'src', 'modules', moduleName)
const pagesDir = path.join(__dirname, 'src', 'pages', moduleName)

if (fs.existsSync(modulesDir) || fs.existsSync(pagesDir)) {
  console.log(`Le module ${moduleName} existe déjà.`)
  process.exit(1)
}

fs.mkdirSync(modulesDir, { recursive: true })
fs.mkdirSync(pagesDir, { recursive: true })

// providerApi.js (ou autre nom)
fs.writeFileSync(
  path.join(modulesDir, `${moduleName}Api.js`),
  `import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../auth/authApi'

export const ${moduleName}Api = createApi({
  reducerPath: '${moduleName}Api',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['${Module}'],
  endpoints: (b) => ({
    list${Modules}: b.query({
      query: () => '${moduleName}s',
      providesTags: ['${Module}']
    }),
    get${Module}: b.query({
      query: (id) => \`${moduleName}s/\${id}\`,
      providesTags: (result, error, id) => [{ type: '${Module}', id }]
    }),
    add${Module}: b.mutation({
      query: (body) => ({ url: '${moduleName}s', method: 'POST', body }),
      invalidatesTags: ['${Module}']
    }),
    update${Module}: b.mutation({
      query: ({ id, ...body }) => ({
        url: \`${moduleName}s/\${id}\`,
        method: 'PUT',
        body,
        ...(body instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } })
      }),
      invalidatesTags: ['${Module}']
    }),
    delete${Module}: b.mutation({
      query: (id) => ({ url: \`${moduleName}s/\${id}\`, method: 'DELETE' }),
      invalidatesTags: ['${Module}']
    }),
    uploadImage: b.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: \`${moduleName}s/\${id}/image\`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: '${Module}', id }],
    }),
  })
})

export const {
  useList${Modules}Query,
  useGet${Module}Query,
  useAdd${Module}Mutation,
  useUpdate${Module}Mutation,
  useDelete${Module}Mutation,
  useUploadImageMutation,
} = ${moduleName}Api
`
)

// use[Module]Form.js
fs.writeFileSync(
  path.join(modulesDir, `use${Module}Form.js`),
  `import {
  useAdd${Module}Mutation,
  useUpdate${Module}Mutation,
  useGet${Module}Query,
  useUploadImageMutation
} from './${moduleName}Api'
import { useNavigate } from 'react-router-dom'

export default function use${Module}Form(id) {
  const { data } = useGet${Module}Query(id, { skip: !id })
  const [add${Module}, addStatus] = useAdd${Module}Mutation()
  const [update${Module}, updateStatus] = useUpdate${Module}Mutation()
  const [uploadImage, uploadStatus] = useUploadImageMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    let savedId = id
    if (id) {
      await update${Module}({ id, ...values }).unwrap()
    } else {
      const res = await add${Module}(values).unwrap()
      savedId = res?.id || res?.${moduleName}?.id
    }
    nav('/${moduleName}s/' + savedId)
  }

  const submitImage = async (${moduleName}Id, file) => {
    await uploadImage({ id: ${moduleName}Id, file }).unwrap()
  }

  return { data, submit, addStatus, updateStatus, submitImage, uploadStatus }
}
`
)

// use[Modules].js (hook liste)
fs.writeFileSync(
  path.join(modulesDir, `use${Modules}.js`),
  `import { useList${Modules}Query } from './${moduleName}Api'

export default function use${Modules}() {
  const { data = [], isLoading, error, refetch } = useList${Modules}Query()
  return { ${moduleName}s: data, isLoading, error, refetch }
}
`
)

// ProvidersList.jsx
fs.writeFileSync(
  path.join(pagesDir, `${Modules}List.jsx`),
  `import use${Modules} from '../../modules/${moduleName}/use${Modules}'
import { useDelete${Module}Mutation } from '../../modules/${moduleName}/${moduleName}Api'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Visibility from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

export default function ${Modules}List () {
  const { ${moduleName}s, isLoading, refetch } = use${Modules}()
  const [delete${Module}] = useDelete${Module}Mutation()
  const nav = useNavigate()
  const { t } = useTranslation()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: t('${moduleName}.name', 'Nom'), flex: 1 },
    { field: 'email', headerName: t('${moduleName}.email', 'Email'), flex: 1 },
    {
      field: 'actions',
      headerName: t('table.actions', 'Actions'),
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="info"
            onClick={() => nav('/${moduleName}s/' + params.row.id)}
            title="Voir le détail"
          >
            <Visibility />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => nav('/${moduleName}s/' + params.row.id + '/edit')}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={async () => {
              if (window.confirm(t('confirm_delete', 'Supprimer ?'))) {
                await delete${Module}(params.row.id)
                refetch()
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16, px: 3 }}
          onClick={() => nav('/${moduleName}s/create')}
        >
          {t('button.add_${moduleName}', 'Ajouter')}
        </Button>
      </Box>
      <Box
        sx={{
          height: 500,
          background: '#fff',
          borderRadius: 2,
          p: 2,
          width: '100%',
          minWidth: 0,
          overflowX: 'auto'
        }}
      >
        <DataGrid
          rows={${moduleName}s}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100]}
          getRowId={row => row.id}
          disableSelectionOnClick
          sx={{
            width: '100%',
            minWidth: 600,
            '& .MuiDataGrid-cell': { whiteSpace: 'normal', wordBreak: 'break-word' }
          }}
        />
      </Box>
    </Stack>
  )
}
`
)

// [Module]Form.jsx (formulaire avancé — à personnaliser)
fs.writeFileSync(
  path.join(pagesDir, `${Module}Form.jsx`),
  `import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import use${Module}Form from '../../modules/${moduleName}/use${Module}Form'
import {
  TextField, Button, Stack, Box, Alert, CircularProgress
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import PhotoUploader from '../../components/PhotoUploader' // active si besoin d'image

export default function ${Module}Form () {
  const { id } = useParams()
  const { data, submit, addStatus, updateStatus } = use${Module}Form(id)
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues: data })
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(null)

  React.useEffect(() => { if (data) reset(data) }, [data, reset])

  const onSubmit = async (values) => {
    setFeedback(null)
    try {
      await submit(values)
      setFeedback({ type: 'success', message: t('${moduleName}.saved', 'Modifications enregistrées !') })
    } catch (err) {
      setFeedback({ type: 'error', message: t('${moduleName}.save_error', 'Erreur lors de l\\'enregistrement') })
    }
  }

  return (
    <Box component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        bgcolor: '#fff',
        p: 4,
        borderRadius: 3,
        boxShadow: 2,
        minHeight: 400
      }}
      noValidate
    >
      <Stack spacing={3}>
        <TextField
          label={t('${moduleName}.name', 'Nom')}
          {...register('name', { required: true })}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!formState.errors.name}
        />
        <TextField
          label={t('${moduleName}.email', 'Email')}
          {...register('email')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        {/* Ajoute d'autres champs ici… */}

        {feedback &&
          <Alert severity={feedback.type} sx={{ mt: 1, mb: 1 }}>
            {feedback.message}
          </Alert>
        }

        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={addStatus.isLoading || updateStatus.isLoading}
          sx={{ fontWeight: 600, mt: 1 }}
        >
          {(addStatus.isLoading || updateStatus.isLoading)
            ? <><CircularProgress size={24} sx={{ color: 'white', mr: 2 }} /> {t('button.saving', 'Enregistrement...')}</>
            : t('button.save', 'Enregistrer')}
        </Button>
      </Stack>
    </Box>
  )
}
`
)

// [Module]Details.jsx (fiche simple à étoffer)
fs.writeFileSync(
  path.join(pagesDir, `${Module}Details.jsx`),
  `import { Box, Typography, Stack, Button, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGet${Module}Query } from '../../modules/${moduleName}/${moduleName}Api'

export default function ${Module}Details() {
  const nav = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGet${Module}Query(id)

  if (isLoading) return <div>Chargement…</div>
  if (!data) return <div>${Module} introuvable</div>

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', mt: 4, mb: 6 }}>
      <Button
        variant="outlined"
        onClick={() => nav('/${moduleName}s')}
        sx={{ mb: 2 }}
      >
        Retour
      </Button>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 4 }}>
        <Typography variant="h4" fontWeight={700}>{data.name}</Typography>
        <Stack direction="row" spacing={1} mt={1} mb={2}>
          {/* Ajoute d'autres infos ici */}
        </Stack>
      </Paper>
      <Button
        variant="contained"
        onClick={() => nav(\`/${moduleName}s/\${id}/edit\`)}
        sx={{ mt: 4, minWidth: 160, fontWeight: 700, fontSize: 16 }}
      >
        Modifier
      </Button>
    </Box>
  )
}
`
)

console.log(`Module ${moduleName} scaffoldé avec succès et structure avancée !`)
