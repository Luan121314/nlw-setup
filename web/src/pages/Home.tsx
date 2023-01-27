import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SummaryTable } from "../components/SummaryTable";
import { useAuth } from "../hooks/useAuth";

export function Home() {

  const {user} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
      console.log('checking auth on Home', user);

      if(!user?.name){
          console.log('Does not authenticated redirect to auth', user);
          
          navigate('/auth')
      }
  },[user])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
       <Header/>
       <SummaryTable/>
      </div>
    </div>
  );
}

