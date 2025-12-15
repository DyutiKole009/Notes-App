import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = ({ setIsLoggedIn, isLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* 🔥 REAL ROUTE GUARD (REACTIVE) */
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);   // 🔥 this triggers redirect above
  };

  /* ---------- GET USER ---------- */
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/get-user");
        setUserInfo(res.data.user);
      } catch (err) {
        handleLogout(); // invalid token
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  /* ---------- NOTES ---------- */
  const getAllNotes = async () => {
    const res = await axiosInstance.get("/get-all-notes");
    setNotes(res.data.note || []);
  };

  const onSearchNote = async (query) => {
    const res = await axiosInstance.get("/search-notes", {
      params: { query },
    });
    setIsSearch(true);
    setNotes(res.data.notes || []);
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    if (isLoggedIn) getAllNotes();
  }, [isLoggedIn]);

  const isDashboard = location.pathname.includes("dashboard");

  return (
    <>
      {isLoggedIn && (
        <Navbar
          userInfo={userInfo}
          onMenuClick={() => setSidebarOpen((p) => !p)}
          showSearch={isDashboard}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      )}

      {isLoggedIn && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          navigate={navigate}
        />
      )}

      <div className="mt-20 px-6 md:px-10">
        <Outlet context={{ notes, isSearch, refreshNotes: getAllNotes }} />
      </div>
    </>
  );
};

export default DashboardLayout;
