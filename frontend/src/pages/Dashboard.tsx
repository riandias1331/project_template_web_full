import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Dashboard.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api"

export default function Dashboard() {
    const navigate = useNavigate()
    const [users, setUsers] = useState<any[]>([])
    const [showUsers, setShowUsers] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
    }, [navigate])

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const stats = {
        totalVendas: 12450,
        usuariosAtivos: 342,
        pedidosHoje: 18,
        taxaConversao: 2.4
    }

    const fetchUsers = async () => {
        setLoadingUsers(true)
        const token = localStorage.getItem('token')
        
        try {
            const response = await fetch(`${API_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários')
            }
            
            const data = await response.json()
            setUsers(data)
            setShowUsers(true)
        } catch (error) {
            console.error('Erro:', error)
            alert('Erro ao carregar usuários')
        } finally {
            setLoadingUsers(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">◆ DASHBOARD</h1>
                    <p className="dashboard-welcome">Bem-vindo, {user.name || "Usuário"}!</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    ✕ Sair
                </button>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">R$ {stats.totalVendas.toLocaleString()}</div>
                    <div className="stat-label">Total em Vendas</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-value">{stats.usuariosAtivos}</div>
                    <div className="stat-label">Usuários Ativos</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-value">{stats.pedidosHoje}</div>
                    <div className="stat-label">Pedidos Hoje</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">{stats.taxaConversao}%</div>
                    <div className="stat-label">Taxa de Conversão</div>
                </div>
            </div>

            <div className="dashboard-section">
                <button 
                    onClick={fetchUsers} 
                    className="users-btn"
                    disabled={loadingUsers}
                >
                    {loadingUsers ? "⏳ Carregando..." : "👥 Ver Usuários Cadastrados"}
                </button>
            </div>

            {showUsers && (
                <div className="dashboard-section">
                    <div className="users-header">
                        <h3 className="users-title">👥 Lista de Usuários ({users.length})</h3>
                        <button 
                            onClick={() => setShowUsers(false)} 
                            className="close-btn"
                        >
                            ✕ Fechar
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Criado em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userItem: any) => (
                                    <tr key={userItem._id}>
                                        <td>{userItem._id?.slice(-6) || '-'}</td>
                                        <td>{userItem.name}</td>
                                        <td>{userItem.email}</td>
                                        <td>
                                            {userItem.createdAt 
                                                ? new Date(userItem.createdAt).toLocaleDateString('pt-BR') 
                                                : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="dashboard-section">
                <h2 className="section-title">📋 Atividades Recentes</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <span className="activity-icon">🛒</span>
                        <div>
                            <div className="activity-title">Novo pedido #1234</div>
                            <div className="activity-time">Há 5 minutos</div>
                        </div>
                    </div>
                    <div className="activity-item">
                        <span className="activity-icon">👤</span>
                        <div>
                            <div className="activity-title">Novo usuário cadastrado</div>
                            <div className="activity-time">Há 1 hora</div>
                        </div>
                    </div>
                    <div className="activity-item">
                        <span className="activity-icon">⭐</span>
                        <div>
                            <div className="activity-title">Avaliação 5 estrelas</div>
                            <div className="activity-time">Há 3 horas</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <h2 className="section-title">🔗 Links Rápidos</h2>
                <div className="links-grid">
                    <a href="/profile" className="link-card">👤 Meu Perfil</a>
                    <a href="/settings" className="link-card">⚙️ Configurações</a>
                    <a href="/reports" className="link-card">📊 Relatórios</a>
                    <a href="/support" className="link-card">🆘 Suporte</a>
                </div>
            </div>
        </div>
    )
}