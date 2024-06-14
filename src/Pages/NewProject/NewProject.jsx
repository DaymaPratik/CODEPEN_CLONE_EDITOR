import SplitPane from 'react-split-pane'
import '../../index.css'
import { FaChevronDown, FaCss3, FaHtml5, FaJs, FaPen } from 'react-icons/fa6'
import { MdCheck } from 'react-icons/md'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase/FireBase';
import { Link } from 'react-router-dom';

export default function NewProject() {
  
  const [html,setHtml]=useState('');
  const [css,setCss]=useState('');
  const [js,setJs]=useState('');
  const [output,setOutput]=useState('');
  const [isTittle,setIsTittle]=useState(false);
  const [tittleName,setTittleName]=useState('Untittled')
  const [alert,setAlert]=useState(false);
  const user=useSelector(state => state.user?.user)
  useEffect(()=>{
    updateOp();
  },[html,js,css])
  function updateOp(){
    const combinedOp=`
     <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js}</script>
    </body>
    </html>
    `
    setOutput(combinedOp);
  }



  const saveProgram=async ()=>{
      const id=`{${Date.now()}}`;
      const _doc={
        id:id,
        tittle:tittleName,
        html:html,
        css:css,
        js:js,
        output:output,
        user:user,
  };
      await setDoc(doc(db,"Projects",id),_doc)
      .then((res)=>{
        setAlert(true);
      }).catch((e)=>console.log(e))


      setInterval(()=>{
        setAlert(false);
      },2000)
  }
  return (
   

   <div className='new-project-section flex  flex-col justify-start items-start h-screen w-screen relative overflow-hidden'>
    <header className='flex items-center justify-between w-full  px-12 py-2 h-fit relative bg-[#434448] text-white'>
     <div className='header-left flex justify-center items-center '>
       <Link to={"/home"}>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRysjE1r4wfI8-u8VsADcL4QilN89veiguHVQ&s" className='h-[40px] 
       w-[100px]' 
       alt="" />
       </Link>
       <div className='projectName-name-box flex flex-col  p-2'>

        {isTittle 
        ? 
         <div className='flex justify-center items-center gap-1'>
         <input type="text" value={tittleName} onChange={(e)=>{setTittleName(e.target.value)}} placeholder='Your Tittle'
          className='border-none outline-none bg-[#2b2b2d] p-2'/>
         <MdCheck className='text-xl text-black cursor-pointer' onClick={()=>{setIsTittle(false) ;console.log(isTittle)}} />
       </div>
        :
        <div className='flex justify-center items-center gap-1'>
          <p className='project-name text-[20px] font-semibold'>{tittleName}</p>
          <FaPen className='text-xl text-black cursor-pointer' onClick={()=>{setIsTittle(true) ;console.log(isTittle)}}/>
        </div> 
        }

        <p className='developer-name text-[15px] font-semibold'>Pamxz Ramz</p>
       </div>
       </div>




         <div className='rigth-section flex justify-center items-center gap-2 '>
          <button className='bg-green-400 p-2 rounded-md' onClick={saveProgram}>Save</button> 
          <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" 
          className='w-[50px]' alt="" />
          <FaChevronDown className='text-xl text-black'/>
         </div>
    </header>

    <SplitPane split="horizontal" minSize={100} maxSize={-100} defaultSize={"50%"}  className='text-white'>
    {/* TOPSECTION */}
        <SplitPane split="vertical" className='top-section' minSize={500}>
            {/* HTML CODE SPLIT PANE */}
            <div className='html-box flex flex-col justify-start items-start w-full h-full '>
                  <div className='html-header-box flex w-full justify-between items-center '> 
                    <p className='  flex items-center gap-1'>
                    <FaHtml5  className='text-2xl'/> HTML</p>
                    <div className='html-header-right-side flex  items-center cursor-pointer h-full gap-2 px-2'>
                    <FaChevronDown className='text-xl'/>
                    <FaChevronDown className='text-xl'/>                  
                    </div>
                  </div>
                  <div className='code-mirror-box w-full '>
                  <CodeMirror value={html} height="600px" extensions={[javascript({ jsx: true })]}
                   onChange={(value,viewUpdate)=>{setHtml(value)}} theme={"dark"}/>
                  </div>
            </div>

            <SplitPane split='vertical' minSize={500}>
             {/* CSS AND JS SPLIT PANE */}
            
             <div className='html-box flex flex-col justify-start items-start w-full h-full '>
                  <div className='html-header-box flex w-full justify-between items-center '> 
                    <p className='  flex items-center gap-1'><FaCss3  className='text-2xl'/> Css</p>
                    <div className='html-header-right-side flex '>
                    <FaChevronDown className='text-xl'/>
                    <FaChevronDown className='text-xl'/>
                    </div>
                  </div>
                  <div className='code-mirror-box w-full'>
                  <CodeMirror value={css}  height="600px" theme={"dark"} extensions={[javascript({ jsx: true })]}
                  onChange={(value,viewUpdate)=>{setCss(value)}} />
                  </div>
            </div>


            <div className='html-box flex flex-col justify-start items-start w-full h-full '>
                  <div className='html-header-box flex w-full justify-between items-center '> 
                    <p className='  flex items-center gap-1'><FaJs className='text-2xl'/> JS</p>
                    <div className='html-header-right-side flex'>
                    <FaChevronDown className='text-xl'/>
                    <FaChevronDown className='text-xl'/>
                    </div>
                  </div>
                  <div className='code-mirror-box w-full'>
                  <CodeMirror value={js} height="600px" theme={"dark"} extensions={[javascript({ jsx: true })]}
                   onChange={(value,viewUpdate)=>{setJs(value)}} />
                  </div>
            </div>
            </SplitPane>
           
        </SplitPane>
    {/* BOTTOM SECTION */}
    <div className='bot-section overflow-hidden h-full w-full border-none'>
      <iframe srcDoc={output} className='w-full h-full bg-white '/>

      
    </div>
    </SplitPane>
   </div>
   

  )
}
