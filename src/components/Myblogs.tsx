import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Myblogs(){

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get("http://localhost:8787/blog/v1/my-blogs", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res)=>{
            setBlogs(res.data.msg);
        }).catch((error)=>{
            console.log(error);
        })
    }, []);   

    console.log(blogs);

    async function handelDelete(id: number){
        try{
            axios.delete(`http://localhost:8787/blog/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
            }).then((res)=>{
                const filteredArray = blogs.filter((blog: {id: number})=>(blog?.id != id))
                setBlogs(filteredArray);
            }).catch((error)=>{
                console.log(error);
            })
        }catch(error){
            console.log(error);
        }
    }

    return <div className="flex flex-col p-16 justify-center items-center">
        <div className="m-4 w-5/6 flex justify-between items-center">
            <span className="text-gray-400 outline rounded-lg px-4 text-sm">{new Date().toDateString().toLowerCase()}</span>
            <div className="flex gap-3">
                <Link to={'/'} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Home</Link>
            </div>
        </div>
        
        { blogs.length > 0 ? blogs.map((blog: {id: number, title: string, content: string}, index) => {
        return <div key={index} className="w-5/6 flex justify-center flex-col p-4 rounded-xl shadow shadow-blue-500/40 md:shadow-gray-500/30 min-h-40">
            <div className='text-2xl text-extrabold underline decoration-4 decoration-black'>{blog?.title.toUpperCase().slice(0, 15)}</div>
            <div className="px-4 mt-4">{blog?.content.slice(0, 200)}...</div>
            <div className="flex place-self-end gap-3">
                <button className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline" onClick={()=>{
                    navigate(`/blog/update/${blog.id}`)
                }}>Update</button>
                <button className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline" onClick={()=>{
                    handelDelete(blog?.id);
                }}>Delete</button>
            </div>
        </div>
    }): <div>nothing is there!</div>}</div>
}