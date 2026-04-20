import { useState } from "react"

function LoginForm({ handleLogin, authError }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit(e) {
    e.preventDefault()
    await handleLogin({ email, password })
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <h2 className="login-title">Connexion</h2>

        <input
          className="habit-input"
          type="email"
          placeholder="Votre email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="habit-input"
          type="password"
          placeholder="Votre mot de passe"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

      <button className="btn btn-add" type="submit">
        Se connecter
      </button>

      {authError && <p className="error-message">{authError}</p>}
    </form>
  )
}

export default LoginForm