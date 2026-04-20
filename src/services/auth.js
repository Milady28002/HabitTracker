import API_URL from "./api"

export function saveToken(token) {
  localStorage.setItem("token", token)
}

export function getToken() {
  return localStorage.getItem("token")
}

export function removeToken() {
  localStorage.removeItem("token")
}

export function isAuthenticated() {
  return !!getToken()
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Erreur de connexion")
  }

  if (data.token) {
    saveToken(data.token)
  }

  return data
}