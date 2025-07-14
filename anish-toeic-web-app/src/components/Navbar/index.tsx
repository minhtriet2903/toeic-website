import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { routePaths } from "../../routes/helpers";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 p-4 flex justify-around items-center">
      <Link to="/" className="font-bold flex flex-col items-center">
        <img
          src="/anish-toeic-logo.jpg"
          alt=""
          className="h-16 w-16 mr-2 rounded-md"
        />
        <span>Anish Toeic</span>
      </Link>

      <div className="flex items-center space-x-10">
        <div
          className={`lg:flex flex-col lg:flex-row lg:space-x-10 font-bold text-gray-700 absolute lg:relative left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 ${
            isOpen ? "block top-24" : "hidden top-0"
          }`}
        >
          <Link
            to="/"
            className="hover:bg-sky-100 hover:rounded p-2 hover:text-gray-800 block lg:inline"
          >
            Giới thiệu
          </Link>
          <Link
            to={routePaths.courses}
            className="hover:bg-sky-100 hover:rounded p-2 hover:text-gray-800 block lg:inline"
          >
            Khóa học
          </Link>
          <Link
            to={routePaths.vocabularies}
            className="hover:bg-sky-100 hover:rounded p-2 hover:text-gray-800 block lg:inline"
          >
            Từ vựng
          </Link>
          <Link
            to={routePaths.resource}
            className="hover:bg-sky-100 hover:rounded p-2 hover:text-gray-800 block lg:inline"
          >
            Tài liệu
          </Link>
        </div>
        {user && user?.role === "admin" && (
          <Link
            to={routePaths.admin.replace(":tab", "course")}
            className="hover:bg-sky-100 hover:rounded p-2 hover:text-gray-800 block lg:inline"
          >
            Dashboard
          </Link>
        )}
        <div
          className={`lg:flex items-center ${
            isOpen
              ? "block absolute top-72 -left-10 w-full bg-white shadow-md p-4"
              : "hidden lg:flex"
          }`}
        >
          {user ? (
            <Link to="/profile" className="cursor-pointer flex items-center">
              <CiUser className="h-5 w-5" />
              <p className="ml-2">{user?.name}</p>
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-sky-100 rounded-xl p-2 cursor-pointer block lg:inline"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      <button onClick={toggleMenu} className="lg:hidden text-2xl">
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </div>
  );
};

export default Navbar;
