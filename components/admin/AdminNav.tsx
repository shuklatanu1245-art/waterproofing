"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/app/admin/dashboard/LogoutButton";

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { name: "Inquiries", href: "/admin/dashboard" },
    { name: "Services", href: "/admin/dashboard/services" },
    { name: "Process Steps", href: "/admin/dashboard/process" },
    { name: "Before & After Videos", href: "/admin/dashboard/videos" },
    { name: "Manage Staff", href: "/admin/dashboard/staff" },
    { name: "Settings", href: "/admin/dashboard/settings" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-200 pb-4">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-primary mr-4">Owner Panel</h1>
        <nav className="flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-accent text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <LogoutButton />
    </div>
  );
}
