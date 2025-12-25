import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import JobDetail from "./pages/JobDetail";
import CompanyJobs from "./pages/CompanyJobs";
import Navbar from "./components/Navbar"
export default function App(){
 
    return (
       <>
        <Navbar />
        <Routes>
            
            <Route path="/" element={<Home/>}/>
            <Route path="/jobs/:slug" element={<JobDetail/>}/>
            <Route path="/company/:slug" element={<CompanyJobs/>}/>
        </Routes>
      </>
    )
}