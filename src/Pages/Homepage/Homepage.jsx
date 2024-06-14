import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import AllProjects from "../ProjectsPage/AllProjects";
import { FaChevronLeft, FaSearchengin } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Hompage() {
  const [isSideMenu, setIsSideMenu] = useState(false);
 const user =useSelector(state => state.user?.user)
  useEffect(() => {
    // console.log(isSideMenu);
  }, [isSideMenu]);
  function openSideMenu() {
    setIsSideMenu((preVal) => {
      return !preVal;
    });
  }
  return (
    <main className="main-home-box relative flex">
      <aside
        className={`left-home-page w-2 ${
          isSideMenu ? "w-2" : " flex-[.2] xl:flex-[.2]"
        } text-gray-100 bg-[#1E1F26] h-[100vh] relative text-center flex py-3 flex-col gap-4 transition-all ease-in`}
      >
        <span
          className="border-2 border-red absolute top-1 right-[-30px] cursor-pointer hover:bg-red-500 z-10"
          onClick={openSideMenu}
        >
         <FaChevronLeft className="text-2xl text-white"/>
        </span>
        <div className=" overflow-hidden flex  flex-col gap-4">
          <h1 className="text-[30px] font-semibold">Codepen</h1>
          
          <Link to={"/newProject"}><button className="border-2 border-blue-400 text-[20px] block w-[95%] rounded-md py-2">
            Start Coding
          </button></Link>
         

          {user && (
            <Link to={"/home"}>
              {" "}
              <p className="text-[20px] font-semibold">Home</p>
            </Link>
          )}
        </div>
      </aside>

      <section className="text-center h-[100vh] w-full flex-1 relative py-5">
        <div className="ip-search-box flex justify-center items-center py-3 ">
          <FaSearchengin className="text-[35px] bg-[#1E1F26] text-white" />
          <input
            type="search"
            name="search"
            id="search"
            className="w-[80%] block  text-[20px] border-none outline-none p-1 bg-[#1E1F26]"
            placeholder="Search here..."
          />
          {!user && (
            <Link to={"/author"}>
              <button className="border-2 border-red-500 text-[20px] py-1 px-3 cursor-pointer bg-emerald-200 hover:bg-emerald-500 transition duration-150 ease-in">
            Signup
          </button>
          </Link>
          )}
          {user && (
          <div className="user-profile flex justify-center gap-2 items-center bg-emerald-400 p-2 text-[15px]">
            <p>{user?.email[0].toUpperCase()}</p>            
          </div>
          )}
        </div>

        <Routes>
          <Route path="/author" element={<LoginPage />} />
          <Route path="/project" element={<AllProjects />} />
        </Routes>
      </section>
    </main>
  );
}
