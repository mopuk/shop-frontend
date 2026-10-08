export default async function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
}
