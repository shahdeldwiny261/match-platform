import { Outlet } from "react-router"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import LoginWall from "../components/common/LoginWall"

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <LoginWall />
    </div>
  )
}
