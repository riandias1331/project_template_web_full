import { useState } from "react"
import { registerUser } from "../services/api"
import "../styles/Login.css"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleRegister() {
    setError("")
    
    // Validação básica frontend
    if (!name.trim()) {
      setError("Nome é obrigatório")
      return
    }
    
    if (!email.trim()) {
      setError("Email é obrigatório")
      return
    }
    
    if (!email.includes("@")) {
      setError("Email inválido (falta @)")
      return
    }
    
    if (password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const data = await registerUser(name, email, password)
      
      console.log("Resposta do backend:", data)  // 🔥 DEBUG
      
      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.data))
      }

      alert("Conta criada com sucesso!")
      window.location.href = "/dashboard"

    } catch (err: any) {
      console.error("Erro capturado:", err)  // 🔥 DEBUG
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <h1>Criar Conta</h1>
        <p>Cadastre sua conta</p>

        <button className="social google">Continuar com Google</button>
        <button className="social github">Continuar com GitHub</button>

        <div className="separator">ou</div>

        {/* 🔥 MOSTRA O ERRO NA TELA */}
        {error && (
          <div style={{ 
            backgroundColor: "#fee2e2", 
            color: "#dc2626", 
            padding: "10px", 
            borderRadius: "8px", 
            marginBottom: "15px",
            textAlign: "center",
            fontSize: "14px"
          }}>
            ❌ {error}
          </div>
        )}

        <input
          placeholder="Nome"
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
          placeholder="Senha (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          className="login-btn" 
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Criar Conta"}
        </button>

        <span>
          Já possui conta? <a href="/login">Entrar</a>
        </span>
      </div>
    </div>
  )
}