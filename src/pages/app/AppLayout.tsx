import { AppSidebar } from "../../Components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../Components/breadcrumb"
import { Separator } from "../../Components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../Components/sidebar"
import { useEffect, useState } from "react"
import { useAppContext } from "../GlobalContext/AppContaxt"
import { useParams } from "react-router-dom"
import ButtonComponent from "../../UIComponents/ButtonComponent"
import AlertComponent from "@/UIComponents/AlertComponent"
import AccordionComponent from "@/UIComponents/AccordionComponent"
import CalendarComponent from "@/UIComponents/CalendarComponent"
import CardComponent from "@/UIComponents/CardComponent"
import ComboboxComponents from "@/UIComponents/ComboboxComponents"
import CheckboxComponent from "@/UIComponents/CheckboxComponent"
import Categories from "./Categories"
import CarouselComponent from "@/UIComponents/CarouselComponent"
import TableComponent from "@/UIComponents/TableComponent"
import RadioGroupComponent from "@/UIComponents/RadioGroupComponent"
import PasswordComponent from "@/UIComponents/PasswordComponent"
import TextAreaComponent from "@/UIComponents/TextAreaComponent"
import TextInputComponent from "@/UIComponents/TextInputComponent"
import FileInputComponent from "@/UIComponents/FileInputComponent"
import TimelineComponent from "@/UIComponents/TimeLineComponents"
import ChartComponent from "@/UIComponents/ChartComponent"
import TextEditor from "@/Components/Input/TextEditor"
import PinInputComponent from "@/UIComponents/PinInputComponent"
import ToolTipComponent from "@/UIComponents/ToolTipComponent"
import StarRatingComponent from "@/UIComponents/StarRatingComponent"
import NotificationComponent from "@/UIComponents/NotificationComponent"
import AppHeader from "@/Components/Header/AppHeader"
import ScrollToTopButton from "@/Components/common/scrolltotop"
import DrawerComponent from "@/UIComponents/DrawerComponent"
import SettingsDisplay from "./Settings"
import Dashboard from "@/Components/Dashboard/Dashboard"
import Adverthisment from "@/Components/Advertisment/Adverthisment"

export default function AppLayout() {
  const { component } = useParams()
  const { currentComponent, setCurrentComponent } = useAppContext()

  // On mount or when URL changes
 useEffect(() => {
  if (component === undefined) {
    setCurrentComponent("dashboard");
  } else if (component !== currentComponent) {
    setCurrentComponent(component);
  }
}, [component]);



   // Update browser tab title
   useEffect(() => {
    if (currentComponent) {
      const titleMap: Record<string, string> = {
        categories: "Categories",
        dashboard: "Dashboard",
        accordion:"Accordion",
        alert:"Alert",
        button:"Button",
        calendar:"Calendar",
        chart: "Chart",
        card: "Card",
        carousel: "Carousel",
        checkbox: "Checkbox",
        combobox: "Combobox",
        Drawer: "Drawer",
        fileinput: "File Input",
        table: "Table",
        textinput: "Text Input",
        timeline: "Timeline",
        textarea: "TextArea",
        texteditor: "Text Editor",
        tooltip: "Tool Tip",
        notification: "Notification",
        password: "Password",
        pininput: "Pin Input",
        radiogroup: "Radio Group",
        starrating: "Star Rating",
      }
      document.title = titleMap[currentComponent]
    }
  }, [currentComponent])


  const [compoent]=useState([


    // Main Content
    {
      id:"dashboard",
      className:"w-[100%] min-h-full",
      component:<Dashboard />
    },

     {
      id:"categories",
      className:"flex justify-center w-[100%] items-center min-h-full",
      component:<Categories />
    },

      {
      id:"settings",
      className:"flex justify-center items-center min-h-full p-4",
      component:<SettingsDisplay />
    },




    // Components
      {
      id:"accordion",
      className:"flex justify-center p-4",
      component:<AccordionComponent />
    },
      {
      id:"alert",
      className:"flex justify-center items-center min-h-full",
      component:  <AlertComponent />
    },
      {
      id:"button",
      className:"flex justify-center items-center min-h-full",
      component:<ButtonComponent />
    },
      {
      id:"calendar",
      className:"flex justify-center items-center min-h-full",
      component:<CalendarComponent />
    },
     {
      id:"card",
      className:"flex justify-center items-center min-h-full",
      component:<CardComponent />
    },
      {
      id:"chart",
      className:"flex justify-center items-center min-h-full p-4",
      component:<ChartComponent />
    },
     {
      id:"checkbox",
      className:"flex justify-center items-center min-h-full p-4",
      component:<CheckboxComponent />
    },
     {
      id:"combobox",
      className:"flex justify-center items-center min-h-full p-4",
      component:<ComboboxComponents />
    },
     {
      id:"carousel",
      className:"flex justify-center items-center min-h-full p-4",
      component:<CarouselComponent />
    },
     {
      id:"drawer",
      className:"flex justify-center items-center min-h-full p-4",
      component:<DrawerComponent />
    },
     {
      id:"fileinput",
      className:"flex justify-center items-center min-h-full p-4",
      component:<FileInputComponent />
    },
      {
      id:"table",
      className:"flex justify-center min-h-full p-4",
      component:<TableComponent />
    },
      {
      id:"textinput",
      className:"flex justify-center items-center min-h-full p-4",
      component:<TextInputComponent />
    },
      {
      id:"textarea",
      className:"flex  justify-center items-center min-h-full p-4",
      component:<TextAreaComponent />
    },
       {
      id:"texteditor",
      className:"flex  justify-center items-center min-h-full p-4",
      component:<TextEditor />
    },
    {
      id:"timeline",
      className:"flex justify-center items-center min-h-full p-4",
      component:<TimelineComponent />
    },
    {
      id:"tooltip",
      className:"flex justify-center items-center min-h-full p-4",
      component:<ToolTipComponent />
    },
     {
      id:"notification",
      className:"flex  justify-center items-center min-h-full p-4",
      component:<NotificationComponent />
    },

      {
      id:"password",
      className:"flex justify-center items-center min-h-full p-4",
      component:<PasswordComponent />
    },
    {
      id:"pininput",
      className:"flex justify-center items-center min-h-full p-4",
      component:<PinInputComponent />
    },
      {
      id:"radiogroup",
      className:"flex justify-center items-center min-h-full p-4",
      component:<RadioGroupComponent />
    },
    {
      id:"starrating",
      className:"flex justify-center items-center min-h-full p-4",
      component:<StarRatingComponent />
    },
  ])

  return (
   <SidebarProvider className="flex flex-col min-h-screen bg-dashboard-background text-dashboard-foreground">
  {/* Sticky App Header */}
  <div className="sticky top-0 z-50 bg-background">
    <AppHeader />
  </div>

  <div className="flex flex-1 min-h-0">
    {/* Sidebar */}
    <AppSidebar />

    {/* Content Area */}
    <SidebarInset className="flex flex-col flex-1 min-h-0 overflow-hidden bg-dashboard-background text-dashboard-foreground">
      
      {/* Subheader with Breadcrumb */}
      <header className="flex h-16 ml-2 md:ml-0 shrink-0 items-center justify-between gap-2 mr-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 **:text-foreground" />
          <Separator
            orientation="vertical"
            className="mr-2 bg-foreground text-background data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="block">
                <BreadcrumbLink onClick={() => setCurrentComponent("")}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="block" />
              <BreadcrumbItem className="block">
                <BreadcrumbPage className="capitalize">
                  {currentComponent}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="hidden lg:flex">
          <Adverthisment />
        </div>
        <div className="hidden md:block text-sm">
          <span className="text-create">companyName</span> <span>Acc Year:2025 - 2026</span>
        </div>
      </header>
      
      {/* Scrollable Main Area */}
      <main className="flex-1 overflow-auto">
        {component === undefined ? (
          // Render default component (Dashboard)
          <div className="w-full min-h-full">
            <Dashboard />
          </div>
        ) : (
          compoent.map((comp, index) =>
            currentComponent === comp.id ? (
              <div key={index} className={comp.className}>
                {comp.component}
              </div>
            ) : null
          )
        )}
      </main>


    </SidebarInset>
  </div>

  <ScrollToTopButton />
</SidebarProvider>

  )
}
