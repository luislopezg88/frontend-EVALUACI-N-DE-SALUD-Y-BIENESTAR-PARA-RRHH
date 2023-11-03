import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Dashboard from "./Dashboard";
import Routine from "./routine";


export default function Home() {
  const auth = useAuth();
  const [loadedUser, setLoaderUser] = useState(false)
  
  useEffect(() => {
    if(auth.isAuthenticated){
      setLoaderUser(true);
    }
  }, [auth]);

  if(!loadedUser) return <p>Loading ...</p>

  return auth.getUser()?.tipo === 'employee' ? <Routine /> : <Dashboard /> 
   
}
