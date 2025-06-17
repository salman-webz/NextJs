"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "../Redux/hooks";
import { logout } from "../Redux/features/authSlice";
import React from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    router.push("/login");
  };

  const menu = [
    { name: "Employees", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-md flex flex-col py-8 px-4 fixed top-0 left-0 z-40">
      <div className="mb-10 text-2xl font-bold text-blue-600 text-center">Admin Panel</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md text-lg font-medium transition-colors duration-150 ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto w-full px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-150"
      >
        Logout
      </button>
    </aside>
  );
} 