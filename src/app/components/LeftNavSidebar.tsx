import React from "react";
import { HiMiniHome } from "react-icons/hi2";
import { BsChatDotsFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillNotification } from "react-icons/ai";
import { PiTreeStructure } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { RiContactsBookFill } from "react-icons/ri";
import { MdOutlineChecklist } from "react-icons/md";
import { RiSettings2Fill } from "react-icons/ri";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { TbStarsFilled } from "react-icons/tb";

const LeftNavSidebar = () => {
  const navItems = [
    { icon: <HiMiniHome />, isActive: false, tooltip: "Home" },
    { icon: <BsChatDotsFill />, isActive: true, tooltip: "Chats" },
    { icon: <IoTicket />, isActive: false, tooltip: "Ticket" },
    { icon: <FaChartLine />, isActive: false, tooltip: "Trend" },
    { icon: <TfiMenuAlt />, isActive: false, tooltip: "Menu" },
    { icon: <AiFillNotification />, isActive: false, tooltip: "Notifications" },
    {
      icon: (
        <div className="relative w-full h-24 flex items-center justify-center">
          <PiTreeStructure className=" rotate-90" />
          <BsStars className="absolute top-9 left-4 h-3 w-3 text-yellow-300" />
        </div>
      ),
      isActive: false,
      tooltip: "Notifications",
    },
    { icon: <RiContactsBookFill />, isActive: false, tooltip: "Menu" },
    { icon: <MdOutlineChecklist />, isActive: false, tooltip: "Menu" },
    { icon: <RiSettings2Fill />, isActive: false, tooltip: "Menu" },
  ];

  return (
    <div className=" overflow-hidden z-[100] fixed  w-14 flex top-0 border-r-2 border-gray-200 flex-col items-center py-4 space-y-1 h-[100vh] bg-white overflow-y-hidden">
      {/* Logo */}
      <div className=" bg-green-500 rounded-full flex items-center justify-center h-8 w-8 mb-4">
        <span className="text-white text-lg font-bold">P</span>
      </div>

      {/* Navigation items */}
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`h-8 w-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
            item.isActive ? "text-gray-800 " : " text-gray-400 "
          }`}
          title={item.tooltip}
        >
          <span className="text-lg">{item.icon}</span>
        </div>
      ))}

      {/* Bottom items */}
      <div className="flex-1 "></div>

      <TbStarsFilled className="mb-4 h-5 w-5 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-gray-600" />
      <TbLayoutSidebarLeftExpandFilled className="h-5 w-5 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-gray-600" />
    </div>
  );
};

export default LeftNavSidebar;
