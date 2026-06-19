import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api"

export default function Dashboard() {
    const navigate = useNavigate()
    const [users, setUsers] = useState<any[]>([])
    const [showUsers, setShowUsers] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)

    // Verifica se usuário está logado
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
    }, [navigate])

    

    // Dados falsos do dashboard
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const stats = {
        totalVendas: 12450,
        usuariosAtivos: 342,
        pedidosHoje: 18,
        taxaConversao: 2.4
    }

    // Buscar usuários (rota protegida)
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

    // Função para logout
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>📊 Dashboard</h1>
                    <p style={styles.welcome}>Bem-vindo, {user.name || "Usuário"}!</p>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Sair
                </button>
            </header>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <div style={styles.card}>
                    <div style={styles.cardIcon}>💰</div>
                    <div style={styles.cardValue}>R$ {stats.totalVendas.toLocaleString()}</div>
                    <div style={styles.cardLabel}>Total em Vendas</div>
                </div>

                <div style={styles.card}>
                    <div style={styles.cardIcon}>👥</div>
                    <div style={styles.cardValue}>{stats.usuariosAtivos}</div>
                    <div style={styles.cardLabel}>Usuários Ativos</div>
                </div>

                <div style={styles.card}>
                    <div style={styles.cardIcon}>📦</div>
                    <div style={styles.cardValue}>{stats.pedidosHoje}</div>
                    <div style={styles.cardLabel}>Pedidos Hoje</div>
                </div>

                <div style={styles.card}>
                    <div style={styles.cardIcon}>📈</div>
                    <div style={styles.cardValue}>{stats.taxaConversao}%</div>
                    <div style={styles.cardLabel}>Taxa de Conversão</div>
                </div>
            </div>

            {/* Botão para ver usuários */}
            <div style={styles.section}>
                <button 
                    onClick={fetchUsers} 
                    style={styles.usersButton}
                    disabled={loadingUsers}
                >
                    {loadingUsers ? "Carregando..." : "👥 Ver Usuários Cadastrados"}
                </button>
            </div>

            {/* Tabela de Usuários (condicional) */}
            {showUsers && (
                <div style={styles.section}>
                    <div style={styles.usersHeader}>
                        <h3 style={styles.usersTitle}>👥 Lista de Usuários ({users.length})</h3>
                        <button 
                            onClick={() => setShowUsers(false)} 
                            style={styles.closeButton}
                        >
                            ✕ Fechar
                        </button>
                    </div>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>ID</th>
                                    <th style={styles.th}>Nome</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Criado em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userItem: any) => (
                                    <tr key={userItem._id}>
                                        <td style={styles.td}>{userItem._id?.slice(-6) || '-'}</td>
                                        <td style={styles.td}>{userItem.name}</td>
                                        <td style={styles.td}>{userItem.email}</td>
                                        <td style={styles.td}>
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

            {/* Atividades Recentes (falsas) */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>📋 Atividades Recentes</h2>
                <div style={styles.activityList}>
                    <div style={styles.activityItem}>
                        <span style={styles.activityIcon}>🛒</span>
                        <div>
                            <div style={styles.activityTitle}>Novo pedido #1234</div>
                            <div style={styles.activityTime}>Há 5 minutos</div>
                        </div>
                    </div>
                    <div style={styles.activityItem}>
                        <span style={styles.activityIcon}>👤</span>
                        <div>
                            <div style={styles.activityTitle}>Novo usuário cadastrado</div>
                            <div style={styles.activityTime}>Há 1 hora</div>
                        </div>
                    </div>
                    <div style={styles.activityItem}>
                        <span style={styles.activityIcon}>⭐</span>
                        <div>
                            <div style={styles.activityTitle}>Avaliação 5 estrelas</div>
                            <div style={styles.activityTime}>Há 3 horas</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links rápidos */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>🔗 Links Rápidos</h2>
                <div style={styles.linksGrid}>
                    <a href="/profile" style={styles.linkCard}>👤 Meu Perfil</a>
                    <a href="/settings" style={styles.linkCard}>⚙️ Configurações</a>
                    <a href="/reports" style={styles.linkCard}>📊 Relatórios</a>
                    <a href="/support" style={styles.linkCard}>🆘 Suporte</a>
                </div>
            </div>
        </div>
    )
}

// Estilos inline
const styles = {
    container: {
        minHeight: "100vh",
        background: "#f5f5f5"
    },
    header: {
        background: "#667eea",
        color: "white",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap" as const,
        gap: "15px"
    },
    title: {
        fontSize: "24px",
        margin: 0
    },
    welcome: {
        margin: "5px 0 0",
        opacity: 0.9
    },
    logoutBtn: {
        padding: "8px 20px",
        background: "rgba(255,255,255,0.2)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px"
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        padding: "30px 40px",
        maxWidth: "1200px",
        margin: "0 auto"
    },
    card: {
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center" as const,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    cardIcon: {
        fontSize: "32px",
        marginBottom: "10px"
    },
    cardValue: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#667eea"
    },
    cardLabel: {
        color: "#666",
        marginTop: "5px"
    },
    section: {
        maxWidth: "1200px",
        margin: "0 auto 30px",
        padding: "0 40px"
    },
    sectionTitle: {
        marginBottom: "15px",
        color: "#333"
    },
    usersButton: {
        width: "100%",
        padding: "15px",
        background: "#667eea",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background 0.2s"
    },
    usersHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px"
    },
    usersTitle: {
        margin: 0,
        color: "#333"
    },
    closeButton: {
        padding: "8px 16px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px"
    },
    tableContainer: {
        background: "white",
        borderRadius: "10px",
        overflow: "auto",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse" as const
    },
    th: {
        padding: "12px 15px",
        textAlign: "left" as const,
        background: "#f8f9fa",
        borderBottom: "2px solid #dee2e6",
        fontWeight: "bold"
    },
    td: {
        padding: "12px 15px",
        borderBottom: "1px solid #dee2e6"
    },
    activityList: {
        background: "white",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    activityItem: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        padding: "15px 20px",
        borderBottom: "1px solid #eee"
    },
    activityIcon: {
        fontSize: "24px"
    },
    activityTitle: {
        fontWeight: "bold",
        marginBottom: "5px"
    },
    activityTime: {
        fontSize: "12px",
        color: "#999"
    },
    linksGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px"
    },
    linkCard: {
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        textAlign: "center" as const,
        textDecoration: "none",
        color: "#667eea",
        fontWeight: "bold",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        transition: "transform 0.2s"
    }
}