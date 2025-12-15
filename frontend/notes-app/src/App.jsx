import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = ({ setIsLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  /* ---------- GET USER ---------- */
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/get-user");
        setUserInfo(res.data.user);
      } catch (err) {
        handleLogout(); // 🔥 auto logout if token invalid
      }
    };

    fetchUser();
  }, [token]);

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
    if (token) getAllNotes();
  }, [token]);

  const isDashboard = location.pathname.includes("dashboard");

  return (
    <>
      {token && (
        <Navbar
          userInfo={userInfo}
          onMenuClick={() => setSidebarOpen((p) => !p)}
          showSearch={isDashboard}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      )}

      {token && (
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
