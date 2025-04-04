"use client";

import Sidebar from "./navbar";

const LayoutWithSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default LayoutWithSidebar;
