import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export function Auth(){

    const navigate = useNavigate()


    const {signInWithGoogle, user} = useAuth()



    async function handleInitAuth(){
      console.log('button > checking auth on Auth', user);

        if(!user?.name){
           await signInWithGoogle()
            // return
        }
        console.log('redirect to home', user);
        
        navigate('/home')
    }


   

    useEffect(()=>{
        
        const alreadyAuthenticated = !!user
        console.log('should be auto reditresct to home', !!alreadyAuthenticated);
        if(alreadyAuthenticated){
            navigate('/home')
        }
    },[user])

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-5xl px-6 gap-6  flex justify-center items-center" >
                <span className="text-3xl font-extrabold" >Inicie com login</span>
                <button
                className='border border-violet-500 font-semibold rounded-lg px-6 py-4  gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background'
                 onClick={()=> handleInitAuth()} >
                    <span className='text-3xl  text-google-blue'  >G</span>
                    <span className='text-3xl  text-google-red'  >o</span>
                    <span className='text-3xl  text-google-yellow'  >o</span>
                    <span className='text-3xl  text-google-blue'  >g</span>
                    <span className='text-3xl  text-google-green'  >l</span>
                    <span className='text-3xl  text-google-red'  >e</span>
                </button>
            </div>
      </div>
    )
} 


