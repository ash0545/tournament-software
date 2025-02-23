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

import { NavUser } from "./nav-user";
import { useAuthUser } from "@/components/hooks/use-auth-user";

export default function sidebar() {
  const { user, isLoading } = useAuthUser();

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
        <NavUser user={user} loading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
}
