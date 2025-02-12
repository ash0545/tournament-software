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

import { signOut } from "@/components/lib/firebase/auth";
import router from "next/router";
import { removeSession } from "@/components/lib/actions/auth-actions";

export default function sidebar() {
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

  const handleSignOut = async () => {
    try {
      await signOut();
      await removeSession();
      // Redirect to home page or login page after sign out
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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
        <SidebarMenu className="py-6">
          {lowerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => {
                  item.title === "Sign Out" ? handleSignOut() : null;
                }}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
