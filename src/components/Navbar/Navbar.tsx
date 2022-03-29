import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation(); // sirve para saber en que route estamos

  return (
    <nav className="bg-[#fff1f2] mb-20">
      <div className="relative flex items-center justify-center h-16">
        <Link
          className={`mr-5 p-2 rounded-md ${
            location.pathname != "/" ? "opacity-20" : ""
          }`}
          to="/"
        >
          My Favorite Videos
        </Link>

        <Link
          className={`mr-5 p-2 rounded-md ${
            location.pathname != "/new-video" ? "opacity-20" : ""
          }`}
          to="/new-video"
        >
          Create new video
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
