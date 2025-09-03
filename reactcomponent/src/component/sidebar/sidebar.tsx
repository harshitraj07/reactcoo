import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  
  return (
    <div
      className={`${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarCollapsed
      }`}
    >
      <div className={styles.sidebarHeader}>
        {isOpen && (
          <button className={styles.closeBtn} onClick={toggleSidebar}>
            ×
          </button>
        )}
        
      </div>

      <nav className={styles.nav}>
        <Link to="/">
          <FaCog className={styles.icon} />
          <span>MY LOGO</span>
        </Link>
        <Link to="/">
          <FaHome className={styles.icon} />
          <span>Dashboard</span>
        </Link>
        <Link to="/profile">
          <FaUser className={styles.icon} />
          <span>Profile</span>
        </Link>
        <Link to="/settings">
          <FaCog className={styles.icon} />
          <span>Settings</span>
        </Link>
        <Link to="/">
          <FaSignOutAlt className={styles.icon} />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
