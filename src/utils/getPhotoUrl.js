// src/utils/getPhotoUrl.js
export default function getPhotoUrl(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (value instanceof File || value instanceof Blob) return URL.createObjectURL(value)
  return ''
}
