/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/AuthSlice";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Regis = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        username: username,
        nama: nama,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setMsg("Registrasi berhasil! Silakan login.");
      // navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  // const [nama, setNama] = useState('');
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confPassword, setConfPassword] = useState('');
  // const [msg, setMsg] = useState('');
  // const navigate = useNavigate();

  // const Regis = async(e)=>{
  //   e.preventDefault();
  //   try{
  //     await axios.post('http://localhost:5000/users', {
  //       nama:nama,
  //       username:username,
  //       email:email,
  //       password:password,
  //       confPassword:confPassword,
  //     });
  //     navigate("/");
  //   }catch(error){
  //     if(error.response){
  //       console.log(error.response.data);
  //     }
  //   }
  // }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={Regis}>
          {msg && (
            <div
              className={`p-4 mb-4 text-center rounded-md ${msg.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
              {msg}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-gray-600 mb-2">Nama</label>
            <input
              type="text"
              id="nama"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">Username</label>
            <input
              type="username"
              id="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confpassword" className="block text-gray-600 mb-2">Konfirmasi Password</label>
            <input
              type="password"
              id="confpassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Ulang Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="button is-success w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  )
}
