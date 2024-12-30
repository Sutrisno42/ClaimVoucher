/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/AuthSlice";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ username, password }));
    };

    // const Auth = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:5000/login', {
    //             username: username,
    //             password: password
    //         });
    //         localStorage.setItem("isAuthenticated", "true");
    //         navigate("/dashboard");
    //     } catch (error) {
    //         if (error.response) {
    //             setMsg(error.response.data.msg);
    //         }
    //     }
    // }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <form onSubmit={Auth}>
                    {isError && <p className="has-text-centered">{message}</p>}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 mb-2">Username</label>
                        <input
                            type="username"
                            id="username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Username Anda"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan Sandi Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* <p className="has-text-centered"> {msg} </p> */}
                    <button
                        type="submit"
                        onSubmit={Auth}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Dont have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    )
}
