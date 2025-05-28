import TopNavBar from "./components/TopNavBar";
import LeftNavSidebar from "./components/LeftNavSidebar";
import ChatArea from "./components/ChatArea";
import ChatSidebar from "./components/ChatSidebar";
import RightNavSidebar from "./components/RightNavSidebar";

export default function Home() {
  return (
    <div className="flex  overflow-y-hidden">
      <TopNavBar />
      <div className="flex w-full mt-12">
        <LeftNavSidebar />
        <ChatSidebar />
        <ChatArea />
        {/* <RightInfoSidebar /> */}
        <RightNavSidebar/>
      </div>
    </div>
  );
}
