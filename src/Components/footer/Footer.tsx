import { useState } from "react";
import { Link } from "react-router-dom";
function Footer() {
  const [address]=useState([
    'address','street','location','pin code','Tamilnadu, India,',
  ])

  const [contact]=useState([
    'info@logicx.in','9843213500',
  ])
  const [company]=useState([
    {
      label:"Home",
      link:"/"
    },
    {
      label:"About",
      link:"/about"
    },
    {
      label:"Contact",
      link:"/contact"
    },
    {
      label:"Blogs",
      link:"/blog"
    },
    {
      label:"Product",
      link:"/product"
    },
    {
      label:"Features",
      link:"/features"
    },

  ])
  // Projects

   const [project]=useState([
    {
      label:"Billing",
      link:"/"
    },
    {
      label:"Portfolio",
      link:"/about"
    },

  ])


  const [legal]=useState([
    {
      label:"Privacy Policy",
      link:"/"
    },
    {
      label:"Terms & Conditions",
      link:"/about"
    },
    {
      label:"Return Policy",
      link:"/contact"
    },
    {
      label:"Accessibility",
      link:"/blog"
    },

  ])
  return (
    <footer className=" bg-neutral-700">
      <div className="mb-5">
        <div className="grid md:grid-cols-4 p-5 gap-5 text-white">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-[#128d57]">Logicx</div>
            <div className="flex flex-col gap-2">
              {
              address.map((address,idx)=>(
                <p key={idx}>{address}</p>
              ))
            }
            </div>
              <div>
                 {
              contact.map((contact,idx)=>(
                <p key={idx}>{contact}</p>
              ))
            }
              </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-[#128d57]">Logicx</div>
                   <div className="flex flex-col gap-2">
              {
              company.map((company,idx)=>(
                <Link  key={idx} className="flex flex-col" to={company.link}>{company.label}</Link>
              ))
            }
            </div>
          </div>
{/* Projects */}
             <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-[#128d57]">Project</div>
                   <div className="flex flex-col gap-2">
              {
              project.map((project,idx)=>(
                <Link key={idx} className="flex flex-col" to={project.link}>{project.label}</Link>
              ))
            }
            </div>
          </div>
           <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-[#128d57]">Legal</div>
                  <div className="flex flex-col gap-2">
              {
              legal.map((legal,idx)=>(
                <Link key={idx} className="flex flex-col" to={legal.link}>{legal.label}</Link>
              ))
            }
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm text-center border-t border-gray-700 bg-neutral-200 text-white px-2 py-7'>
        Copyright &copy; 2025 Logicx. Powered by Aaran Software
      </div>
    </footer>
  );
}

export default Footer;
