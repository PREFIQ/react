import { useState, useEffect } from "react"
import NotificationButton from "../Alert/NotificationButton"
import logo from '../../assets/svg/logo.svg'
import { ModeToggle } from "../mode-toggle"
import GlobalSearch from "../Input/SearchBox"
import ImageButton from "../Button/ImageBtn"
import NotificationCard from "../Alert/NotificationCard"
import MessageCard from "../Alert/MessageCard"

function AppHeader() {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // 🧠 Reset search UI when screen gets larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setShowMobileSearch(false)
      }
    }

    handleResize() // Ensure correct state on initial render
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

   const handleFullscreen = () => {
    const el = document.documentElement; // or use a specific element like `document.getElementById("root")`

    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen(); // Safari
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen(); // IE11
    }
  };



  
const NotificationData = [
  {
    date: "2023-08-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
      avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
    },
  },
    {
    date: "2023-08-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
      avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
    },
  },
  {
    date: "2023-08-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
  {
    date: "2023-05-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
  {
    date: "2023-06-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
    {
    date: "2023-07-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
];

const messageData = [
  {
    date: "2023-08-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
      avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
    },
  },
   {
    date: "2023-08-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
      avatar: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?...",
    },
  },
  {
    date: "2023-06-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
    {
    date: "2023-07-01",
    title: 'Created "Preline in React" task',
    description: "Find more detailed instructions here.",
    user: {
      name: "James Collins",
     initial:"J"
    },
  },
];
const [showNotification,setShowNotification]=useState(false);
const [showMessage,setShowMessage]=useState(false);
  return (
    <header className="px-2 sm:px-5 py-1 bg-background border-b border-ring/20">
      {/* Mobile: Only Search Field View */}
      {showMobileSearch ? (
        <div className="flex justify-end p-2 gap-2 w-full">
          <GlobalSearch className="flex-1  w-full" />
          <ImageButton
            icon="close"
            onClick={() => setShowMobileSearch(false)}
            className="border border-ring/30 p-2"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-5">
          {/* Logo */}
          <div className="flex-shrink-0 p-2">
            <img src={logo} alt="LogicX Logo" className="w-25" />
          </div>

          {/* Desktop: Search + Buttons */}
          <div className="flex items-center gap-3 flex-1 justify-end p-2">
            <div className=" hidden md:block ">
            <GlobalSearch className="flex-1 max-w-[800px]" />
            </div>
              <div className="flex sm:hidden items-center gap-2">
              <ImageButton
                icon="search"
                onClick={() => setShowMobileSearch(true)}
                className="border border-ring p-2"
              />
            </div>
            
            <div className="relative">
               <NotificationButton mode="icon" count={3} icon="bell" onClick={()=>{setShowNotification(!showNotification)}} />
              {
                showNotification && (
                   <div className="absolute top-12 right-0">
                    <NotificationCard items={NotificationData}
                      showCollapse
                      onClose={() => setShowNotification(false)} />
                  </div>
                )
              }
            </div>
            <div className="relative">
              <NotificationButton mode="icon" count={3} icon="message" onClick={()=>{setShowMessage(!showMessage)}} />
              {showMessage && (
                <div className="absolute top-12 right-0 z-50">
                  <MessageCard
                    items={messageData}
                    showCollapse
                    onClick={() => setShowMessage(false)} // Closes on outside click
                  />
                </div>
              )}
            </div>
           
            {/* <NotificationButton mode="icon" count={5} icon="message" /> */}
            <ImageButton icon="fullscreen" className="border hidden md:block border-ring/30 p-2" onClick={handleFullscreen}/>

          
            <div className="hidden sm:block">
              <ModeToggle />
            </div>
          </div>
          
        </div>
        )}
     
    </header>
  )
}

export default AppHeader
