import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    
    async function handelForm(e: any){
        e.preventDefault();

        axios.post("http://localhost:8787/user/signin", {
            email: email,
            password: password
        }).then((res)=>{
            console.log(res.data.msg);
            const token = "bearer" + " " + res.data.token;
            localStorage.setItem("token", token);
            navigate("/");
        }).catch((error)=>{
            console.log(error);
        })
    }

    return <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
        <div className="text-3xl text-extrabold">signin</div>
        <form onSubmit={handelForm} className="flex flex-col gap-4 min-w-96">
            <input type="text" value={email} placeholder="email" onChange={(e)=>{
                setEmail(e.target.value)
            }} className="border-2 border-gray-600 focus:border-purple-800 rounded-lg text-center min-w-96"/>
            <input type="password" value={password} placeholder="password" onChange={(e)=>{
                setPassword(e.target.value)
            }} className="border-2 border-gray-600 focus:border-purple-800 rounded-lg text-center min-w-96"/>
            <button type="submit" className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Sign In</button>
        </form>
    </div>
}