import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarMenu,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { BsAmd } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#10577a">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <BsAmd size={32} /> NgocBao
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
        
          <CDBSidebarMenu>
            <NavLink exact to="/admins" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admins/manage-user" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Quản lý User</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admins/manageQuizz" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="list">Quản lý Bài Quizz</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admins/manageQuestion" target="_blank" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="question">Quản lý Câu Hỏi</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          
        </CDBSidebarContent>
        
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;