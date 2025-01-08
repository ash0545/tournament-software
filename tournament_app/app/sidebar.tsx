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

export default function sidebar() {
  const upperItems = [
    {
      title: "Tournaments",
      url: "/tournament/create",
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
        <SidebarMenu className="py-6">
          {lowerItems.map((item) => (
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
      </SidebarFooter>
    </Sidebar>
  );
}
