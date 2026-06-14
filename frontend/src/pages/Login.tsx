import "../styles/Login.css"

export default function Login() {
  return (
    <div className="login">

      <div className="card">

        <h1>Entrar</h1>

        <p>
          Entre com sua conta
        </p>

        <button className="social google">
          Continuar com Google
        </button>

        <button className="social github">
          Continuar com GitHub
        </button>

        <div className="separator">
          ou
        </div>

        <input
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Senha"
        />

        <button className="login-btn">
          Entrar
        </button>

        <span>
          Não possui conta?
          <a href="/register">
            Criar conta
          </a>
        </span>

      </div>

    </div>
  )
}