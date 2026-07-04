import { useState } from "react"
import { loginUser } from "../services/api"
import "../styles/Login.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    setError("")

    if (!email.trim()) {
      setError("Email é obrigatório")
      return
    }

    if (!password.trim()) {
      setError("Senha é obrigatória")
      return
    }

    setLoading(true)

    try {
      const data = await loginUser(email, password)

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.data))

      window.location.href = "/dashboard"

    } catch (err: any) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="badge">🔐 System Pro</div>
        <h1>Bem-vindo de volta</h1>
        <p>Entre com sua conta para continuar</p>

        <button className="social google">🔵 Continuar com Google</button>
        <button className="social github">⚫ Continuar com GitHub</button>

        <div className="separator">ou continue com email</div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        <input
          placeholder="📧 seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔒 Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="forgot-password">
          <a href="/forgot-password">Esqueceu sua senha?</a>
        </div>

        <button 
          className="login-btn" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "⏳ Entrando..." : "⚡ Entrar"}
        </button>

        <span>
          Não possui conta? <a href="/register">Criar conta</a>
        </span>
      </div>
    </div>
  )
}