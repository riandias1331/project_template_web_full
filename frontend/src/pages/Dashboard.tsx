// Dashboard.tsx
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/Dashboard.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api"

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    
    if (!token) {
      navigate("/login")
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header Simplificado */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">👋 Olá, {user?.name || "Usuário"}!</h1>
          <p className="dashboard-welcome">Bem-vindo ao seu espaço</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </header>

      {/* Cards de Acesso Rápido */}
      <div className="quick-actions">
        <div className="section-header">
          <h2>Ações Rápidas</h2>
        </div>
        <div className="cards-grid">
          <Link to="/profile" className="action-card">
            <div className="card-icon">👤</div>
            <h3>Meu Perfil</h3>
            <p>Ver e editar seus dados</p>
          </Link>

          <div className="action-card" onClick={() => alert("Funcionalidade em desenvolvimento")}>
            <div className="card-icon">📝</div>
            <h3>Novo Pedido</h3>
            <p>Criar um novo pedido</p>
          </div>

          <div className="action-card" onClick={() => alert("Funcionalidade em desenvolvimento")}>
            <div className="card-icon">📊</div>
            <h3>Relatórios</h3>
            <p>Ver relatórios e análises</p>
          </div>

          <div className="action-card" onClick={() => alert("Funcionalidade em desenvolvimento")}>
            <div className="card-icon">⚙️</div>
            <h3>Configurações</h3>
            <p>Ajustar preferências</p>
          </div>
        </div>
      </div>

      {/* Informações do Usuário */}
      <div className="user-info-section">
        <div className="section-header">
          <h2>Suas Informações</h2>
        </div>
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">Nome:</span>
            <span className="info-value">{user?.name || "Não informado"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email || "Não informado"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">ID do Usuário:</span>
            <span className="info-value">{user?._id?.slice(-8) || "Não informado"}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="status-section">
        <div className="section-header">
          <h2>Status</h2>
        </div>
        <div className="status-card">
          <div className="status-item">
            <span className="status-dot green"></span>
            <span>Conectado</span>
          </div>
          <div className="status-item">
            <span className="status-label">Sessão iniciada em:</span>
            <span>{new Date().toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Footer com Links */}
      <div className="dashboard-footer">
        <Link to="/" className="footer-link">🏠 Home</Link>
        <Link to="/login" className="footer-link">🔐 Login</Link>
      </div>
    </div>
  )
}