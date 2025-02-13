import {
  Calendar,
  Flag,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { auth } from "@/components/lib/firebase/client-app";
import { NavUser } from "./nav-user";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // set user when firebase has verified auth state
      setLoading(false);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const upperItems = [
    {
      title: "Tournaments",
      url: "/tournaments",
      icon: Flag,
    },
    {
      title: "Events",
      url: "/events",
      icon: Calendar,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
    },
    {
      title: "Statistics",
      url: "#",
      icon: BarChart,
    },
  ];

  const lowerItems = [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Sign Out",
      url: "/login",
      icon: LogOut,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tournament Software</SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarMenu className="py-6">
            {upperItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} loading={loading} />
      </SidebarFooter>
    </Sidebar>
  );
}
