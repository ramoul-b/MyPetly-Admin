import {
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useUploadImageMutation
} from './usersApi'
import { useNavigate } from 'react-router-dom'

export default function useUserForm(id) {
  const { data } = useGetUserQuery(id, { skip: !id })
  const [addUser, addStatus] = useAddUserMutation()
  const [updateUser, updateStatus] = useUpdateUserMutation()
  const [uploadImage, uploadStatus] = useUploadImageMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    let savedId = id
    if (id) {
      await updateUser({ id, ...values }).unwrap()
    } else {
      const res = await addUser(values).unwrap()
      savedId = res?.id || res?.user?.id
    }
    nav(`/users/${savedId}`)
  }

  const submitImage = async (userId, file) => {
    await uploadImage({ id: userId, file }).unwrap()
  }

  return { data, submit, addStatus, updateStatus, submitImage, uploadStatus }
}
