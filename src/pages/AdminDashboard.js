import { useState } from "react";
import { SidebarProvider } from "../components/ui/sidebar";
import { AdminSidebar } from "../components/admin_dashboard/AdminSidebar";
import { DashboardContent } from "../components/admin_dashboard/DashboardContent";
import { ReportListView } from "../components/admin_dashboard/ReportListView";
import { StatisticsView } from "../components/admin_dashboard/StatisticsView";
import { Button } from "../components/ui/button";
import { SidebarTrigger } from "../components/ui/sidebar";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardContent />;
      case "reports":
        return <ReportListView />;
      case "statistics":
        return <StatisticsView />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="flex items-center h-16 px-6 border-b bg-card">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">
                {currentView === "dashboard" && "Admin Dashboard"}
                {currentView === "reports" && "Report Management"}
                {currentView === "statistics" && "Statistics & Analytics"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Monitor and manage illegal fishing reports
              </p>
            </div>
            <Button variant="outline" size="sm">
              Generate Report
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;