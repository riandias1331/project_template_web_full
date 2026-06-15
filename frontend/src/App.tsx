import { Routes, Route, Navigate } from "react-router-dom"  // 🔥 Removeu BrowserRouter
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")
  return token ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    // 🔥 NÃO TEM MAIS <BrowserRouter> aqui!
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App