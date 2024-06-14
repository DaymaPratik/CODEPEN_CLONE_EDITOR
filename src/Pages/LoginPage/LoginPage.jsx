import { FaEnvelope, FaEye, FaEyeSlash, FaPassport } from "react-icons/fa6";
import { signInWithGithub, signInWithGoogle ,auth} from "../../Firebase/FireBase";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [showPass,setShowPass]=useState(false);
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [isEmailValid,setIsEmailValid]=useState(false);
  const [isLogIn,setIsLogIn]=useState(false);
  const [userFound,setUserFound]=useState(true);
  useEffect(()=>{
          const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const status=emailRegex.test(email);
          setIsEmailValid(status);
  },[email])
  function showPassword(){
    setShowPass(!showPass);
  }
  async function createNewUser(e){
    e.preventDefault();
    if(isEmailValid){
      await createUserWithEmailAndPassword(auth,email,pass).then((userCred)=>{
        if(userCred){
          console.log(userCred);
        }
      }).catch((e)=>{console.log(e);})
    }
    setEmail('');
    setPass('');
  }
  async function logInWithUser(e){
    e.preventDefault();
    if(isEmailValid){
      await signInWithEmailAndPassword(auth,email,pass).then((userCred)=>{
        if(userCred){
          console.log(userCred);
        }
      }).catch((e)=>{console.log(e);
        setUserFound(!userFound)
      })
    }
    setEmail('');
    setPass('');
  }
  return (
    <div className="text-white  h-full bg-[#131417]">
      <h3 className="text-[25px] font-semibold ">Join With Us</h3>
      <form action="" className="w-[30%]  bg-[#1E1F26] p-6 rounded-md text-left mx-auto my-10 gap-4 flex flex-col justify-center items-center">
     
        <div className=" w-full flex justify-start items-starts flex-col ">
          <label htmlFor="email" className="text-[15px] font-semibold">
            EMAIL:
          </label>
          <div className={`${!isEmailValid &&  email.length>0 && 'border-2 border-red-500'} text-[#1e1f26] bg-white flex items-center justify-center
           w-full rounded-md px-4 py-1 gap-1`}>
            <FaEnvelope className="text-2xl text-[#1e1f26]"/>
          <input type="email" className=" border-none outline-none w-full flex-1 p-1" placeholder="Email Here" value={email} 
          onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
        </div>




        <div className=" w-full flex justify-start items-starts flex-col ">
          <label htmlFor="pass" className="text-[15px] font-semibold">
            PASSWORD:
          </label>
          <div className="flex items-center justify-center w-full rounded-md px-4 py-1 gap-1 text-[#1e1f26] bg-white">
            <FaPassport className="text-[#1e1f26]"/>
           
          <input type={showPass ? 'text' :'password'}  value={pass} 
          onChange={(e)=>{setPass(e.target.value)}} className=" border-none outline-none w-full flex-1 p-1" placeholder="Enter Password" />
          <div className="show-pass-btn " onClick={showPassword}>{showPass ? <FaEyeSlash className="text-2xl text-[#1e1f26]"/> :
          <FaEye className="text-2xl text-[#1e1f26]"/>}</div>
          </div>
        </div>

        
        {isLogIn ? (<button className="login-btn bg-green-400 text-[20px] font-semibold w-[100%] rounded-sm py-1 px-3" onClick={(e)=>logInWithUser(e)}>Login</button>)
         : (<button className="login-btn bg-green-400 text-[20px] font-semibold w-[100%] rounded-sm py-1 px-3" onClick={(e)=>createNewUser(e)}>Sign Up</button>)}

        {userFound ? "" : <p className="text-red-400">User Not Found</p> }
        <p>
          {!isLogIn ? "Already have a account !" :"Dont have account ?"} <span className="text-green-400 cursor-pointer" 
        onClick={()=>{setIsLogIn(!isLogIn)}}>
          {!isLogIn ? "Login " :"Create Here"}
          </span></p>
        <div className="or-box flex gap-3 items-center justify-center" >
          <div className="h-[1px] w-[70px] bg-white"></div>
          <p>or</p>
          <div  className="h-[1px] w-[70px] bg-white"></div>
        </div>
        <button className="bg-[#4B4C51] rounded-md w-[100%] text-[20px] font-semibold py-1 px-3" onClick={(e)=>signInWithGoogle(e)}>
          Sign in with Google</button>

          <div className="or-box flex gap-3 items-center justify-center" >
          <div className="h-[1px] w-[70px] bg-white"></div>
          <p>or</p>
          <div  className="h-[1px] w-[70px] bg-white"></div>
        </div>
        
        <button className="bg-[#4B4C51] rounded-md w-[100%] text-[20px] font-semibold py-1 px-3" onClick={(e)=>signInWithGithub(e)}>
          Sign in with Github</button>
      </form>
    </div>
  );
}
