"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function ButtonLogout() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black shadow-md transition duration-300 hover:bg-black hover:text-white cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </Button>
  );
}
