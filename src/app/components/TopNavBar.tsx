import React from "react";
import { TbRefreshDot, TbHelp } from "react-icons/tb";
import { BiSolidBellOff } from "react-icons/bi";
import { MdOutlineInstallDesktop } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { TbStarsFilled } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { CgScrollV } from "react-icons/cg";
const TopNavBar = () => {
  return (
    <nav className="h-12 fixed left-0 right-0 bg-white border-b border-gray-200 text-gray-700 flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">W</span>
        </div>
        <span className="text-sm font-medium text-gray-600">chats</span>
      </div>

      {/* Center section */}
      <div className="flex items-center space-x-2"></div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        <div className="flex border-1 border-gray-200 items-center space-x-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
          <TbRefreshDot className="w-4 h-4" />
          <span className="text-sm ">Refresh</span>
        </div>
        <div className="flex border-1 border-gray-200 items-center space-x-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
          <TbHelp className="w-4 h-4" />
          <span className="text-sm">Help</span>
        </div>
        <div className="flex border-1 border-gray-200 items-center space-x-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
          <span className="px-1 py-1 text-yellow-300 bg-yellow-300 rounded-full h-2 w-2">
            .
          </span>
          <span className="text-sm">5 / 6 phones</span>
          <CgScrollV/>
        </div>
        <BiSolidBellOff className="w-7 h-7 border-1 border-gray-200 p-1 rounded-sm cursor-pointer hover:text-gray-900" />
        <MdOutlineInstallDesktop className="w-7 h-7 border-1 border-gray-200 p-1 rounded-sm cursor-pointer hover:text-gray-900" />
        <div className="flex border-1 border-gray-200 p-1 rounded-sm">
          <BsStars className="text-yellow-300" />{" "}
          <TfiMenuAlt className="w-4 h-4 cursor-pointer hover:text-gray-900" />
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
