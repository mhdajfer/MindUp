"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!Cookies.get("accessToken") && user?.role != "admin") {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router, user?.role]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full">
        <SideBar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 md:ml-[240px] overflow-y-auto p-8">{children}</div>
    </div>
  );
}
