import { useRecoilValue } from "recoil"
import { userAtom } from "../store/atoms/userAtom"


export default function Avtar(){
    
    const user: any = useRecoilValue(userAtom);
    console.log(user);

    return <div className="text-black text-extrabold border-2 px-2 items-center justify-center rounded-lg">
        <span>{user?.username}</span>
    </div>
}