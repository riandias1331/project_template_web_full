import { Link } from "react-router-dom"
import "../styles/Home.css"

export default function Home() {
  const token = localStorage.getItem("token")

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <div className="badge">⚡ PLATFORM</div>
          <h1>Bem-vindo ao</h1>
          <h1 className="gradient-text">System Pro</h1> <br />
          {/* <p>Sua plataforma completa para gerenciar seus negócios</p> */}

          {/* 
          <div className="features">
            <div className="features">
              <span>⚡ Backend</span>
              <span>🚀 Frontend</span>
              <span>☁️ Cloud</span>
              <span>🤖 IA</span>
              <span>🎮 Games</span>
              <span>📱 Apps</span>
              <span>🌐 Web</span>
              <span>🔒 Cybersecurity</span>
              <span>💻 Desktop</span>
              <span>📊 Data Science</span>
              <span>📱 Mobile</span>
              <span>🌍 DevOps</span>
              <span>🔗 Blockchain</span>
              <span>🖥️ IoT</span>
              <span>📡 5G</span>
              <span>🧠 Machine Learning</span>
            </div>
          </div>
           */}

          <div className="buttons">
            {token ? (
              <Link to="/dashboard">
                <button className="primary">⚡ Ir para Dashboard</button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="secondary">Entrar</button>
                </Link>
                <Link to="/register">
                  <button className="primary">🚀 Criar Conta</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}