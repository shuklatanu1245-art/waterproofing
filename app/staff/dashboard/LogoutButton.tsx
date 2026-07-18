"use client";

import { useRouter } from "next/navigation";
import { staffLogout } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await staffLogout();
    router.push("/staff");
    router.refresh();
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="text-red-600 border-red-200 hover:bg-red-50"
    >
      Logout
    </Button>
  );
}
