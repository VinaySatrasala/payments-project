"use client";
import React from "react";
  import {
  Home,
  Send,
  FileText,
  Users,
  Wallet,
  DollarSign,
} from "lucide-react";
import { SidebarItem } from "../../components/SideBarItem";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-72 bg-black text-white min-h-screen border-r border-gray-700">
        <div className="pt-8 px-4 space-y-4">
          <SidebarItem href="/dashboard" title="Home" icon={<Home size={20} />} />
          <SidebarItem href="/transfer" title="Transfer" icon={<Send size={20} />} />
          <SidebarItem href="/transactions" title="Transactions" icon={<FileText size={20} />} />
          <SidebarItem href="/P2Ptransfer" title="P2P Transfer" icon={<Users size={20} />} />
          <SidebarItem href="/deposits" title="Deposits" icon={<Wallet size={20} />} />
          <SidebarItem href="/balance" title="Balance" icon={<DollarSign size={20} />} />
        </div>
      </div>
      {/* Main Content */}
      {children}
    </div>
  );
}


