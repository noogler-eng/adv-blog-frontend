import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Update(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}/blog/v1/blog/${params.id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            },
        }).then((res)=>{
            setTitle(res.data.msg.title);
            setContent(res.data.msg.content);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])


    async function handelUpdate(event: any){
        event.preventDefault();
        if(title.length < 5 || content.length< 40){
            return;
        }

        console.log(title, content)
        
        axios.put(`${import.meta.env.VITE_URL}/blog/v1/blog/${params.id}`, {
            title: title,
            content: content
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
        }).then((res)=>{
            console.log(res.data.msg);
            navigate(0);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return <div className="flex justify-center flex-col items-center p-16">
        <div className="m-4 w-5/6 flex justify-between items-center">
            <span className="text-gray-400 outline rounded-lg px-4 text-sm">{new Date().toDateString().toLowerCase()}</span>
            <div className="flex gap-3">
                <Link to={'/'} className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">Home</Link>
            </div>
        </div>
        <div className="text-3xl text-extrabold mb-4">update you blog...</div>
        <form onSubmit={handelUpdate} className="flex flex-col gap-3">
        <input type="text" placeholder="title" value={title} onChange={(e)=>{
            setTitle(e.target.value);
        }} className="border-2 border-gray-600 focus:border-purple-800 rounded-xl text-center min-w-96"/>
        <textarea placeholder="content" value={content} rows={20} onChange={(e)=>{
            setContent(e.target.value);
        }} className="border-2 border-gray-600 focus:border-purple-800 rounded-xl text-center min-w-96"/>
        <button type="submit" className="bg-black text-white text-extrabold px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:outline">submit</button>
    </form>
    </div>
}