import { useNavigate } from "react-router-dom"

import "../styles/Home.css"

export default function Home() {

    const navigate = useNavigate()

    return (

        <div className="home">

            <div className="hero">

                <h1>
                    Seu Projeto Full Stack
                </h1>

                <p>

                    Template moderno para conectar com qualquer backend.
                    React + Vite + TypeScript.

                </p>

                <p>
                    Backend • Frontend • Cloud • IA
                </p>


                <div>

                    🔒 JWT

                </div>

                <div>

                    ☁️ Cloud

                </div>

                <div>

                    🐳 Docker

                </div>

                <div className="buttons">

                    <button
                        className="primary"
                        onClick={() => navigate("/register")}
                    >
                        Começar agora
                    </button>

                    <button
                        className="secondary"
                        onClick={() => navigate("/login")}
                    >
                        Entrar
                    </button>

                </div>

            </div>

        </div>

    )

}