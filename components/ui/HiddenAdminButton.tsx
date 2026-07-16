"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

export function HiddenAdminButton() {
  return (
    <Link 
      href="/admin" 
      className="fixed left-0 top-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center opacity-0 hover:opacity-20 hover:bg-gray-200 transition-all z-50 rounded-r-md cursor-pointer"
      title="Admin Panel"
    >
      <Lock className="w-3 h-3 text-gray-500" />
    </Link>
  );
}
