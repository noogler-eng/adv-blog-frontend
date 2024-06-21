import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Post from "./components/Post";
import Users from "./components/Users";
import Myblogs from "./components/Myblogs";
import Blog from "./components/Blog";
import Update from "./components/Update";

export default function App() {
  return (
    <div className=" h-screen w-screen">
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/post" element={<Post/>}/>
          <Route path="/myblogs" element={<Myblogs/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/blog/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </div>
  );
}
