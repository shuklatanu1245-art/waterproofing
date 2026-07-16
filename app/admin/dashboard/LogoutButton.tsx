"use client";

import { adminLogout } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="bg-white text-primary border-white hover:bg-gray-100">
      Logout
    </Button>
  );
}
