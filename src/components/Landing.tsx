import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { userAtom } from "../store/atoms/userAtom";

export default function Landing(){

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get("http://localhost:8787/blog/v1/user", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res)=>{
            setUser(res.data.user);
        }).catch((error)=>{
            console.log(error);
        })

        axios.get("http://localhost:8787/blog/getAll").then((res)=>{
            setBlogs(res.data.msg);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    function handelLogout(){
        localStorage.removeItem("token");
        setUser(null);
        navigate(0);
    }

    function handelSignin(){
        navigate("/signin");
    }
        
    return <div className="w-full">
        <div className="flex justify-between py-4 px-4 items-center shadow shadow-blue-500/40 md:shadow-gray-500/10">
        <div className="text-extrabold text-2xl">
            MEDIUM<span className="text-gray-400">.com</span>
        </div>
        {user !== null ? 
            <button onClick={handelLogout} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Logout</button> 
            : <button onClick={handelSignin} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Signin</button>
        }</div>
        <div className="w-full flex flex-col justify-center items-center">
            <div className="m-4 w-5/6 flex justify-between items-center mb-8">
                <span className="text-gray-400 outline rounded-lg px-4 text-sm">{new Date().toDateString().toLowerCase()}</span>
                <div className="flex gap-3">
                    <Link to={'/post'} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Post</Link>
                    <Link to={'/users'} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Users</Link>
                    <Link to={'/myblogs'} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Myblogs</Link>
                </div>
            </div>
            {blogs?.map((blog: {
                id: number,
                title: string,
                content: string,
                author: {
                    username: string,
                    email: string
                }
            }, index)=>{
                return <Link to={`/blog/${blog.id}`} className="w-full flex flex-col justify-center items-center" key={index}><div key={index} className="w-5/6 flex justify-center flex-col p-4 rounded-xl shadow shadow-blue-500/40 md:shadow-gray-500/30 min-h-40">
                    <div className='text-2xl text-extrabold underline decoration-4 decoration-black'>{blog?.title.toUpperCase()}</div>
                    <div className="flex justify-end items-center gap-2 my-2">
                        <div className="text-gray-400"><i><b>~ {blog.author.username.slice(0, 15)}...</b></i></div>
                        <div className="text-gray-400 text-sm"><i>{blog.author.email}</i></div>
                    </div>
                    <div className="px-4">{blog?.content.slice(0,250)}...</div>
                </div></Link>
            })}
        </div>
    </div>
}