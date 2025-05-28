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
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { RxTextAlignRight } from "react-icons/rx";
import { TbListDetails } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { RiFolderImageFill } from "react-icons/ri";
import { RiListSettingsLine } from "react-icons/ri";

const RightNavSidebar = () => {
  const navItems = [
    { icon: <TbLayoutSidebarRightExpandFilled />, isActive: false, tooltip: "Sidebar" },
    { icon: <LuRefreshCw />, isActive: true, tooltip: "Sync" },
    { icon: <FiEdit3 />, isActive: false, tooltip: "Edit" },
    { icon: <RxTextAlignRight/>, isActive: false, tooltip: "Menu" },
    { icon: <TbListDetails  />, isActive: false, tooltip: "Menu" },
    { icon: <FiShare2 />, isActive: false, tooltip: "Connect" },
    { icon: <HiUserGroup  />, isActive: false, tooltip: "Group" },
    { icon: < RiFolderImageFill  />, isActive: false, tooltip: "Picture" },
    { icon: < RiListSettingsLine />, isActive: false, tooltip: "Settings" },
  ];

  return (
    <div className=" overflow-hidden w-16 flex flex-col items-center py-4 space-y-1 h-[93.8vh] overflow-y-hidden">
      {/* Logo */}
      <div className="  rounded-full flex items-center justify-center mb-4">
        <span className="text-white text-lg font-bold">W</span>
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
      {/* <div className="flex-1 "></div>

      <TbStarsFilled className="mb-4 h-5 w-5 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-gray-600" />
      <TbLayoutSidebarLeftExpandFilled className="h-5 w-5 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-gray-600" /> */}
    </div>
  );
};

export default RightNavSidebar;
