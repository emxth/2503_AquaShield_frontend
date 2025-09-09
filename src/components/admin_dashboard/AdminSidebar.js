import { Shield, BarChart3, FileText, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

export function AdminSidebar({ currentView, onViewChange }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      id: "dashboard",
      description: "Overview & Quick Actions"
    },
    {
      title: "Report Management",
      icon: FileText,
      id: "reports",
      description: "Review & Process Reports"
    },
    {
      title: "Statistics & Analytics",
      icon: BarChart3,
      id: "statistics",
      description: "Charts & Insights"
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="mt-16 bg-card">
        {/* Brand Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-ocean">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-primary">Aqua Shield</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={`w-full justify-start px-4 h-16 mb-1 ${
                      currentView === item.id 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="flex-shrink-0 w-5 h-5" />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs truncate opacity-70">
                          {item.description}
                        </div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-6 mt-auto border-t">
            <div className="space-y-4">
              <div className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
                Quick Stats
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Reports</span>
                  <span className="text-sm font-bold text-destructive">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="text-sm font-bold text-primary">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-bold text-green-600">94%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}