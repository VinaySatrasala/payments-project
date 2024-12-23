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
import  SidebarItem  from "../../components/side-bar-item";

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
          <SidebarItem icon={<Home size={20} />} href="/dashboard" title="Home" />
          <SidebarItem icon={<Send size={20} />} href="/transfer" title="Transfer" />
          <SidebarItem icon={<FileText size={20} />} href="/transactions" title="Transactions" />
          <SidebarItem icon={<Users size={20} />} href="/P2Ptransfer" title="P2P Transfer" />
          <SidebarItem icon={<Wallet size={20} />} href="/deposits" title="Deposits" />
          <SidebarItem icon={<DollarSign size={20} />} href="/balance" title="Balance" />
        </div>
      </div>
      {/* Main Content */}
      {children}
    </div>
  );
}
