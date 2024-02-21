import { useState } from 'react';
import ProfileSetting from './Setting';
import Members from './Members';
import Invitations from './Invitations';
import NavBar from '../Navbar/Navbar';
import  Placeholder  from "../../Assets/placeholder.png"
import "./Style.css";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("members");

  const handleLinkClick = (contentName) => {
      setActiveContent(contentName);
  };

  return (
    <>
      <NavBar />
      <div className="d-flex">
        <div className="sidebar">
        <div className="logo ">Trek Buddy</div>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className={`nav-item ${activeContent === 'members' ? 'active' : ''}`}>
              <button className="nav-link mb-1" onClick={() => handleLinkClick('members')}><i class="fa-solid fa-circle-user fa-lg Icon"></i>Members</button>
            </li>
            <li className={`nav-item ${activeContent === 'invitations' ? 'active' : ''}`}>
              <button className="nav-link" onClick={() => handleLinkClick('invitations')}>
              <i class="fa-solid fa-paper-plane fa-lg Icon"></i>Invitations
              </button>
            </li>
            <li className={`nav-item ${activeContent === 'settings' ? 'active' : ''} mb-1`}>
              <button className="nav-link " onClick={() => handleLinkClick('settings')}>
              <i class="fa-solid fa-gear fa-lg Icon"></i> Settings
              </button>
            </li>
          </ul>

         {/* <div className="dropdown Margin">
        <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={Placeholder}  alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong className="nav-link ">YourName</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>*/}
  </div>

        <div className="content-container content-background">
          {activeContent === 'members' && <Members />}
          {activeContent === 'invitations' && <Invitations />}
          {activeContent === 'settings' && <ProfileSetting />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
