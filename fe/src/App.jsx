import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Dashboard from "./pages/Dashboard"
import AddVoucherPage from "./pages/AddVoucherPage"
import HistoryPage from "./pages/HistoryPage"
import { useState } from "react"

function App() {
  const [category, setCategory] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route
            path="/"
            element={<Login />}
          />
          
          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Dashboard */}
          <Route 
            path="/dashboard" 
            element={<Dashboard category={category} setCategory={setCategory} />} 
          />
          <Route path="/addVoucher" element={<AddVoucherPage />}/>
          {/* <Route path="/history" element={<HistoryPage />}/> */}
          <Route 
            path="/history" 
            element={<HistoryPage category={category} setCategory={setCategory} />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
