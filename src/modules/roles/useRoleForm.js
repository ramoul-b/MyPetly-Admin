import { useAddRoleMutation, useUpdateRoleMutation, useGetRoleQuery } from './rolesApi'
import { useNavigate } from 'react-router-dom'

export default function useRoleForm(id) {
  const { data } = useGetRoleQuery(id, { skip: !id })
  const [addRole, addStatus] = useAddRoleMutation()
  const [updateRole, updateStatus] = useUpdateRoleMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    let savedId = id
    if (id) {
      await updateRole({ id, ...values }).unwrap()
    } else {
      const res = await addRole(values).unwrap()
      savedId = res?.id || res?.role?.id
    }
    nav(`/roles/${savedId}`)
  }

  const loading = addStatus.isLoading || updateStatus.isLoading

  return { data, submit, loading, addStatus, updateStatus }
}
