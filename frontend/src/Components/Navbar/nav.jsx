import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsJournalRichtext, BsBank2 } from "react-icons/bs";
import { TbMoodSmileBeam } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const navItems = [
    { label: "Home", path: "/", icon: <IoHome /> },
    { label: "Journal", path: "/journal", icon: <BsJournalRichtext /> },
    { label: "Mood", path: "/mood", icon: <TbMoodSmileBeam /> },
    { label: "Growth", path: "/growth", icon: <BsBank2 /> },
    { label: "Letters", path: "/letters", icon: <MdOutlineMail /> },
    { label: "Resources", path: "/resources", icon: <IoBookSharp /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center h-[60px] sm:h-[65px] md:h-[70px] lg:h-[75px]">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `
              flex flex-col items-center sm:flex-row sm:gap-2
              justify-center
              text-xs sm:text-sm md:text-base font-medium
              transition-all duration-300
              ${isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-500"}
              `
            }
          >
            <span className="text-lg sm:text-xl md:text-2xl">{item.icon}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
