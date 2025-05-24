import { DataGrid } from '@mui/x-data-grid'

export default function CrudTable ({ rows, loading }) {
  if (!rows?.length) return null
  const columns = Object.keys(rows[0]).map(k => ({ field: k, flex: 1 }))
  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      loading={loading}
      pageSizeOptions={[10, 25, 50]}
    />
  )
}
