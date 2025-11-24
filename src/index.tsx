import ReactDOM from "react-dom/client";
import "./index.css";
import Colis from "./components/Colis";
import Statistiques from "./components/Statistique";
import Livreurs from "./components/Livreurs";
import Tracking from "./components/Tracking";
import {NavLink} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { UserIcon } from "lucide-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    
    <nav className="flex bg-white/90 justify-between items-center w-full py-1.5 px-5">
      <div className="text-black text-lg font-bold">Logo</div>

      <ul className="flex flex-row items-center gap-4">
        <li>
          <NavLink
            to="/colis"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold border-b-2 border-black-600"
                : "text-black hover:text-gray-300"
            }
          >
            Colis
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/livreurs"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold border-b-2 border-black-600"
                : "text-black hover:text-gray-300"
            }
          >
            Livreurs
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/statistique"
            className={({ isActive }) =>
              isActive
                ? "text-black-600 font-semibold border-b-2 border-black-600"
                : "text-black hover:text-gray-300"
            }
          >
            Statistique
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold border-b-2 border-black-600"
                : "text-black hover:text-gray-300"
            }
          >
            Tracking
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-5 ">
        <div className="bg-gray-400 flex justify-center items-center h-[35px] w-[35px] rounded-full">
          <UserIcon />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-black">John Doe</p>
          <span className="text-xs text-black">Founder</span>
        </div>
      </div>
    </nav>
    <Routes>
      <Route path="/colis" element={<Colis />} />
      <Route path="/" element={<Colis />} />
      <Route path="/livreurs" element={<Livreurs />} />
      <Route path="/statistique" element={<Statistiques />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
