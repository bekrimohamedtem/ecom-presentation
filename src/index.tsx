import ReactDOM from "react-dom/client";
import "./index.css";
import Colis from "./components/Colis";
import Statistiques from "./components/Statistique";
import Livreurs from "./components/Livreurs";
import Tracking from "./components/Tracking";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SidebarProvider, useSidebar } from "./contexts/SidebarContext";
import { SearchProvider } from "./contexts/SearchContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppContent() {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="pt-16 overflow-y-auto h-full">
          <Routes>
            <Route path="/colis" element={<Colis />} />
            <Route path="/" element={<Colis />} />
            <Route path="/livreurs" element={<Livreurs />} />
            <Route path="/statistique" element={<Statistiques />} />
            <Route path="/tracking" element={<Tracking />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <SidebarProvider>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </SidebarProvider>
  </BrowserRouter>
);
reportWebVitals();
