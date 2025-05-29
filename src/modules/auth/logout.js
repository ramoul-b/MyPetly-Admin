export default function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  localStorage.removeItem("roles")
  window.location.href = "/login"
}
