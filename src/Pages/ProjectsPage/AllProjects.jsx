import { useSelector } from "react-redux"

export default function AllProjects() {
  const projects=useSelector(state => state.project?.project)
  console.log(projects ,typeof projects);
  return (
    // <div className="text-white flex flex-wrap justify-center items-center gap-6 py-6 ">
    //  {projects && projects.map((project,idx)=>{
    //   return(
    //     <div key={idx} className="text-white">{project}</div>
    //   )
    //  })}
    //   </div>
    <div>hello</div>
  )
}
