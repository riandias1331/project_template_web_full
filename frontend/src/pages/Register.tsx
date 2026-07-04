import { useState } from "react"
import { registerUser } from "../services/api"
import "../styles/Login.css"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleRegister() {
    setError("")
    setSuccess("")
    
    if (!name.trim()) {
      setError("Nome é obrigatório")
      return
    }
    
    if (!email.trim()) {
      setError("Email é obrigatório")
      return
    }
    
    if (!email.includes("@")) {
      setError("Email inválido")
      return
    }
    
    if (password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const data = await registerUser(name, email, password)
      
      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.data))
      }

      setSuccess("✅ Conta criada com sucesso! Redirecionando...")
      
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="badge">🔐 System Pro 2026</div>
        <h1>Criar Conta</h1>
        <p>Entre para o futuro</p>

        <button className="social google">🔵 Continuar com Google</button>
        <button className="social github">⚫ Continuar com GitHub</button>

        <div className="separator">ou</div>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {error && (
          <div className="error-message">
            ✕ {error}
          </div>
        )}

        <input
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha (6+ caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          className="register-btn" 
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "⏳ Cadastrando..." : "→ Criar Conta"}
        </button>

        <span>
          Já possui conta? <a href="/login">Entrar</a>
        </span>
      </div>
    </div>
  )
}