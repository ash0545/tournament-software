"use client";
import React from "react";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";

function layout_check() {
  const pathName = usePathname();
  return (
    <div className="h-full">
      {
        //conditional system for hiding sidebar on user_auth page
        pathName == "/login" || pathName == "/register" ? null : <Sidebar />
      }
    </div>
  );
}

export default layout_check;
