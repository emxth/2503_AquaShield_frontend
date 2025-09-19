import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, Clock, TrendingUp, FileText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import ActivityMap from "./ActivityMap";

const recentReports = [
  { id: "RPT-001", species: "Tuna", location: "Pacific Ocean", date: "2024-01-15", status: "pending" },
  { id: "RPT-002", species: "Salmon", location: "North Atlantic", date: "2024-01-14", status: "approved" },
  { id: "RPT-003", species: "Cod", location: "Baltic Sea", date: "2024-01-14", status: "rejected" },
  { id: "RPT-004", species: "Shark", location: "Indian Ocean", date: "2024-01-13", status: "pending" },
  { id: "RPT-005", species: "Mackerel", location: "Mediterranean", date: "2024-01-12", status: "approved" },
];

const trendData = [
  { month: "Jan", incidents: 45 },
  { month: "Feb", incidents: 52 },
  { month: "Mar", incidents: 48 },
  { month: "Apr", incidents: 61 },
  { month: "May", incidents: 55 },
  { month: "Jun", incidents: 67 },
];

const speciesData = [
  { species: "Tuna", count: 23 },
  { species: "Salmon", count: 18 },
  { species: "Cod", count: 15 },
  { species: "Shark", count: 12 },
  { species: "Mackerel", count: 8 },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Reports
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
            <CardDescription>
              Latest illegal fishing activity reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{report.id}</span>
                      <Badge
                        variant={
                          report.status === "approved" ? "default" :
                            report.status === "rejected" ? "destructive" : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {report.species} • {report.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {report.date}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    {report.status === "pending" && (
                      <>
                        <Button variant="default" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Activity Map
            </CardTitle>
            <CardDescription>
              Illegal fishing hotspots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center border rounded-lg h-96">
              <ActivityMap />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Incident Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
            <CardDescription>
              Monthly illegal fishing incidents over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Species */}
        <Card>
          <CardHeader>
            <CardTitle>Most Reported Species</CardTitle>
            <CardDescription>
              Species most commonly involved in illegal fishing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={speciesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="species" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}