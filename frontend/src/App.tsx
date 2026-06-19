import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")

  return token
    ? <>{children}</>
    : <Navigate to="/" replace /> // joga pro Home
}

function App() {
  return (
    <Routes>

      {/* HOME PRIMEIRA ROTA */}
      <Route path="/" element={<Home />} />

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

      {/* QUALQUER ROTA INVÁLIDA → HOME */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App


// import { Routes, Route, Navigate } from "react-router-dom"
// import Home from "./pages/Home"  
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Dashboard from "./pages/Dashboard"

// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const token = localStorage.getItem("token")
//   return token ? <>{children}</> : <Navigate to="/login" />
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
      
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
      
//       <Route 
//         path="/dashboard" 
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         } 
//       />
//     </Routes>
//   )
// }

// export default App


// // import { Routes, Route, Navigate } from "react-router-dom"  // 🔥 Removeu BrowserRouter
// // import Login from "./pages/Login"
// // import Register from "./pages/Register"
// // import Dashboard from "./pages/Dashboard"

// // function PrivateRoute({ children }: { children: React.ReactNode }) {
// //   const token = localStorage.getItem("token")
// //   return token ? <>{children}</> : <Navigate to="/login" />
// // }

// // function App() {
// //   return (
// //     <Routes>
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/register" element={<Register />} />
      
// //       <Route 
// //         path="/dashboard" 
// //         element={
// //           <PrivateRoute>
// //             <Dashboard />
// //           </PrivateRoute>
// //         } 
// //       />
      
// //       <Route path="/" element={<Navigate to="/dashboard" />} />
// //     </Routes>
// //   )
// // }

// // export default App