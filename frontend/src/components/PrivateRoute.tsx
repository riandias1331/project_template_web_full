import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {

  const token =
    localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}