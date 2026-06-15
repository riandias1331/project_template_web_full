const API_URL = "http://localhost:3333/api"

export async function registerUser(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })

  // 🔥 PEGA A RESPOSTA COMO JSON PRIMEIRO
  const data = await response.json()

  // 🔥 SE NÃO OK, LANÇA A MENSAGEM DO BACKEND
  if (!response.ok) {
    console.log("Erro do backend:", data)  // 🔥 DEBUG
    throw new Error(data.message || "Erro ao registrar")
  }

  return data
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()

  if (!response.ok) {
    console.log("Erro do backend:", data)  // 🔥 DEBUG
    throw new Error(data.message || "Erro ao fazer login")
  }

  return data
}