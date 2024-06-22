import { useEffect, useState } from "react"
import axios from "axios"

export default function Users(){

    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        axios.get("https://my-blog.sharadpoddar1001.workers.dev/user/all").then((res)=>{
            setUsers(res.data.msg);
        }).catch((error)=>{
            console.log(error)
        })    
    }, [])
    
    return <div className="h-full w-full p-16 flex items-center justify-center flex-col">
        <div className="text-3xl mb-8">USED BY:~</div>
        <div className="flex items-center justify-center flex-wrap w-4/6 gap-4">
            {users.map((user: {
                username: string,
                email: string
            }, index)=>{
                return <div key={index} className="p-4 rounded-xl shadow shadow-blue-500/40 md:shadow-gray-500/30 flex items-center justify-center flex-col hover:bg-black hover:text-white">
                    <div>{user.username}</div>
                    <div>{user.email}</div>
            </div>
            })}
        </div>
    </div>
}