import { ChevronsUpDown, Folder, Palette } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";

import api from "@/lib/api";
import { NavLink } from "react-router-dom";
import ThemeSwitch from "@/components/ThemeSwitch";

export function AppSidebar() {
  const [projects, setProjects] = useState([]);
  async function fetchProject() {
    try {
      const OWNER = import.meta.env.VITE_GITHUB_OWNER;
      const url = `/users/${OWNER}/repos`;
      const response = await api.get(url);
      setProjects(response.data);
    } catch (e) {
      console.error("fetch projects error :" + e.message);
    }
  }

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full justify-between">
              <span>Select Workspace</span>
              <ChevronsUpDown className="h-4 w-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem>Work</DropdownMenuItem>
            <DropdownMenuItem>Activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主題</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Palette />
                  <ThemeSwitch />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>專案</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink to={`/projects/${item.name}`}>
                      <Folder />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
