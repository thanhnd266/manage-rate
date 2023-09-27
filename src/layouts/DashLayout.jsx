import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { DashLayoutChildComponent, DashLayoutChildWrapper, DashLayoutContent, DashLayoutWrapper } from "./styled";

const DashLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashLayoutWrapper>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <DashLayoutContent>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <DashLayoutChildWrapper>
            <DashLayoutChildComponent>
              <Outlet />
            </DashLayoutChildComponent>
          </DashLayoutChildWrapper>
        </main>
      </DashLayoutContent>
    </DashLayoutWrapper>
  );
};

export default DashLayout;
