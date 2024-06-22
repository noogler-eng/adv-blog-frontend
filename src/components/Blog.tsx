import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Blog(){
    
    const [blog, setBlog] = useState<{
        title: string,
        content: string,
        author: {
            username: string,
            email: string
        }
    }>();
    const params = useParams();
    
    useEffect(()=>{
        axios.get(`https://my-blog.sharadpoddar1001.workers.dev/blog/v1/blog/${params.id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res)=>{
            setBlog(res.data.msg);
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    return <div className="flex h-full w-full items-center flex-col">
       <div className="mt-4 place-self-end mr-4 flex gap-3">
        <Link to={"/"} className="bg-black text-white text-extrabold px-3 border-2 border-black rounded-lg hover:bg-white hover:text-black hover:outline">Back</Link>
        <Link to={"/myblogs"} className="bg-black text-white text-extrabold px-3 border-2 border-black rounded-lg hover:bg-white hover:text-black hover:outline">Myblogs</Link>
       </div>
       <div className="flex flex-col items-center w-5/6 mt-8 p-16">
            <div className="text-center underline text-3xl text-extrabold mb-4">
                {blog?.title}
            </div>
            <div className="flex justify-between items-center w-full px-4">
                <div>{blog?.author.username}</div>
                <div>{blog?.author.email}</div>
            </div>
            <div className="p-4">
                {blog?.content}
            </div>
       </div>
    </div>
}