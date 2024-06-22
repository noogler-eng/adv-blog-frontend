import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    
    async function handelForm(e: any){
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_URL}/user/signup`, {
            username: username,
            email: email,
            password: password
        }).then((res)=>{
            console.log(res.data.msg);
            const token = "bearer" + " " + res.data.token;
            localStorage.setItem("token", token);
            navigate("/")
        }).catch((error)=>{
            console.log(error);
        })
    }

    return <div className="h-full w-full flex flex-col">
        <div className="flex place-self-end p-4">
            <Link to={'/'} className="bg-black text-white text-extrabold px-3 border-2 border-black rounded-lg hover:bg-white hover:text-black hover:outline">Home</Link>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
            <div className="text-3xl text-extrabold">signup</div>
            <form onSubmit={handelForm} className="flex flex-col gap-4 min-w-96">
                <input type="text" value={username} onChange={(e)=>{
                    setUsername(e.target.value)
                }} className="border-2 border-gray-600 focus:border-purple-800 rounded-xl text-center min-w-96" placeholder="username"/>
                <input type="text" value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }} className="border-2 border-gray-600 focus:border-purple-800 rounded-xl text-center min-w-96" placeholder="email"/>
                <input type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} className="border-2 border-gray-600 focus:border-purple-800 rounded-xl text-center min-w-96" placeholder="password"/>
                <button type="submit" className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Sign Up</button>
            </form>
            <div>
                <p>already have an account? <Link to={'/signin'} className="underline text-extrabold text-red-400">signin</Link></p>
            </div>
        </div>
    </div>
}