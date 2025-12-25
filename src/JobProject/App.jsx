import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import JobDetail from "./pages/JobDetail";
import CompanyJobs from "./pages/CompanyJobs";
import Navbar from "./components/Navbar"
import PageLoader from "./components/PageLoader";
import {useEffect, useState}from "react"

export default function App(){
 const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // simulate initial app load
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 300); // small delay for smooth UX

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) return <PageLoader />;
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