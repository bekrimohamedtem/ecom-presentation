import React from "react";
import { NavLink } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RouteIcon from "@mui/icons-material/Route";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Package2, UserIcon } from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";

function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white shadow-lg transition-all duration-300 z-50 ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo et bouton toggle */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold">Logo</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isOpen ? (
              <ChevronLeftIcon className="text-white" />
            ) : (
              <MenuIcon className="text-white" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/colis"
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "gap-3 px-4" : "justify-center px-2"
                  } py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
                title={!isOpen ? "Colis" : ""}
              >
                <Package2 size={25} />
                {isOpen && <span>Colis</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/livreurs"
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "gap-3 px-4" : "justify-center px-2"
                  } py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
                title={!isOpen ? "Livreurs" : ""}
              >
                <LocalShippingIcon />
                {isOpen && <span>Livreurs</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/tracking"
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "gap-3 px-4" : "justify-center px-2"
                  } py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
                title={!isOpen ? "Tracking" : ""}
              >
                <RouteIcon />
                {isOpen && <span>Tracking</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/statistique"
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "gap-3 px-4" : "justify-center px-2"
                  } py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
                title={!isOpen ? "Statistique" : ""}
              >
                <BarChartIcon />
                {isOpen && <span>Statistique</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Profil utilisateur */}
        <div className="p-4 border-t border-gray-700">
          <div
            className={`flex items-center ${
              isOpen ? "gap-3" : "justify-center"
            } ${!isOpen ? "flex-col" : ""}`}
          >
            <div className="bg-gray-400 flex justify-center items-center h-10 w-10 rounded-full flex-shrink-0">
              <UserIcon size={20} />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <span className="text-xs text-gray-400">Founder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
