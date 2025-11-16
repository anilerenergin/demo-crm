"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Home, Calendar, MapPin, Users, Heart, Bell, Settings, Menu } from "lucide-react";

interface CRMLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { name: "Dashboard", href: "/crm/dashboard", icon: Home },
  { name: "Events", href: "/crm/events", icon: Calendar },
  { name: "Promoters", href: "/crm/promoters", icon: MapPin },
  { name: "Guests", href: "/crm/guests", icon: Users },
  { name: "Notifications", href: "/crm/notifications", icon: Bell },
];

export default function CRMLayout({ children }: CRMLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? "w-64" : "w-20"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {isOpen && <span className="text-2xl font-bold">EvenMatch CRM</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
{/* Sidebar navigation */}
<ScrollArea className="flex-1 px-1 py-4">
  <div className="space-y-2">
    {sidebarItems.map((item) => (
      <Link key={item.name} href={item.href} passHref>
        <Card
          className={`cursor-pointer hover:bg-gray-100 transition ${
            !isOpen ? "flex justify-center" : ""
          }`}
        >
          <CardContent
            className={`flex items-center space-x-3 px-3 py-3 ${
              !isOpen ? "justify-center px-0" : ""
            }`}
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            {isOpen && <span className="font-medium">{item.name}</span>}
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
</ScrollArea>


        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button className="w-full" variant="secondary">
            {isOpen ? "Logout" : <span className="sr-only">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
