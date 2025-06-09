import { useNavigate } from 'react-router-dom'
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery
} from './categoriesApi'

export default function useCategoryForm(id) {
  const { data } = useGetCategoryQuery(id, { skip: !id })

  const [addCategory, addStatus] = useAddCategoryMutation()
  const [updateCategory, updateStatus] = useUpdateCategoryMutation()
  const nav = useNavigate()

  const submit = async (values) => {
    let savedId = id
    if (id) {
      await updateCategory({ id, ...values }).unwrap()
    } else {
      const res = await addCategory(values).unwrap()
      savedId = res?.id || res?.category?.id
    }
    nav('/categories/' + savedId)
  }

  const loading = addStatus.isLoading || updateStatus.isLoading

  return { data, submit, loading, addStatus, updateStatus }
}
