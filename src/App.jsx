import { Navigate, Route,Routes, useNavigate } from "react-router-dom"
import Hompage from "./Pages/Homepage/Homepage"
import { useEffect, useState } from "react"
import { auth, db } from "./Firebase/FireBase"
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import HashLoader from "react-spinners/HashLoader"
import NewProject from "./Pages/NewProject/NewProject";
import { useDispatch } from "react-redux";
import { SET_USER } from "./Context/Actions/userActions";
import { SET_PROJECTS } from "./Context/Actions/ProjectAction";
function App() {
  const navigate=useNavigate();
  const [load,setLoad]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    const isSignedIn=auth.onAuthStateChanged((userCred)=>{
      if(userCred){
        console.log(userCred?.providerData[0]);
        setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0]).then(()=>{
            //  dispatch action to Store
             dispatch(SET_USER(userCred?.providerData[0]))
             navigate("/home/project" ,{replace:true})
        })
      }else{
         navigate("/home/author",{replace:true})
      }
    })
    setInterval(()=>{
      setLoad(false)
    },2000)
    return ()=>{isSignedIn()}
  },[])


  useEffect(()=>{
    const projectQuery=query(
      collection(db,"Projects"),
      orderBy("id","desc")
    )
    const unsubs=onSnapshot(projectQuery,(querySnaps)=>{
      const projectList=querySnaps.docs.map((doc)=>doc.data());
      dispatch(SET_PROJECTS(projectList));
    })
    return unsubs;
  },[])

  return (
    <>
     {load ? (
      <div className="flex justify-center items-center w-full h-screen bg-[black]">
        <HashLoader color="#36d7b7" />
      </div>
     ) : (
      <Routes>
      <Route path="/home/*" element={<Hompage/>}/>

      {/* ToNAVIGATE DIRECTILTY TO HOME PAGE  */}
      <Route path="*" element={<Navigate to='/home'/> }/>  
      <Route path="/newProject" element={<NewProject/>}/>
    </Routes>
     )
    } 
    </>
  )
}

export default App
