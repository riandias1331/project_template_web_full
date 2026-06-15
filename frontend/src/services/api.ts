// api.ts - VERSÃO HARDCODED PARA TESTE
const API_URL = "http://localhost:3333/api"  // ← COLOCA A URL COMPLETA AQUI!

export async function registerUser(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })

  const data = await response.json()

  if (!response.ok) {
    console.log("Erro do backend:", data)
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
    console.log("Erro do backend:", data)
    throw new Error(data.message || "Erro ao fazer login")
  }

  return data
}