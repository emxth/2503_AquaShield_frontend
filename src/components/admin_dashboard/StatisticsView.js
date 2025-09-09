import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, MapPin, Fish, Calendar, Download } from "lucide-react";

const frequencyData = [
  { month: "Jan", incidents: 45, prevented: 12 },
  { month: "Feb", incidents: 52, prevented: 18 },
  { month: "Mar", incidents: 48, prevented: 15 },
  { month: "Apr", incidents: 61, prevented: 23 },
  { month: "May", incidents: 55, prevented: 19 },
  { month: "Jun", incidents: 67, prevented: 28 },
  { month: "Jul", incidents: 73, prevented: 31 },
  { month: "Aug", incidents: 58, prevented: 22 },
  { month: "Sep", incidents: 64, prevented: 26 },
  { month: "Oct", incidents: 69, prevented: 29 },
  { month: "Nov", incidents: 52, prevented: 20 },
  { month: "Dec", incidents: 48, prevented: 18 },
];

const speciesData = [
  { species: "Bluefin Tuna", count: 145, percentage: 28 },
  { species: "Atlantic Salmon", count: 98, percentage: 19 },
  { species: "Atlantic Cod", count: 87, percentage: 17 },
  { species: "Hammerhead Shark", count: 76, percentage: 15 },
  { species: "Spanish Mackerel", count: 54, percentage: 10 },
  { species: "Others", count: 57, percentage: 11 },
];

const statusData = [
  { name: "Approved", value: 287, color: "hsl(var(--primary))" },
  { name: "Pending", value: 23, color: "hsl(var(--muted))" },
  { name: "Rejected", value: 45, color: "hsl(var(--destructive))" },
];

const hotspotData = [
  { region: "Pacific Ocean", incidents: 156, lat: 20, lng: -155 },
  { region: "North Atlantic", incidents: 89, lat: 50, lng: -30 },
  { region: "Mediterranean Sea", incidents: 67, lat: 40, lng: 15 },
  { region: "Indian Ocean", incidents: 54, lat: -10, lng: 70 },
  { region: "Baltic Sea", incidents: 43, lat: 58, lng: 20 },
];

export function StatisticsView() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Filters</CardTitle>
          <CardDescription>Customize your data view with filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">Time Range</label>
              <DatePickerWithRange />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">Species Filter</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <Fish className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="tuna">Tuna</SelectItem>
                  <SelectItem value="salmon">Salmon</SelectItem>
                  <SelectItem value="cod">Cod</SelectItem>
                  <SelectItem value="shark">Shark</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium">Region Filter</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="pacific">Pacific Ocean</SelectItem>
                  <SelectItem value="atlantic">Atlantic Ocean</SelectItem>
                  <SelectItem value="indian">Indian Ocean</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">517</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Prevented</CardTitle>
            <Fish className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">261</div>
            <p className="text-xs text-muted-foreground">
              50.5% prevention rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Hotspots</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Frequency Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Frequency Over Time</CardTitle>
            <CardDescription>
              Monthly incidents and prevention success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Total Incidents"
                />
                <Line 
                  type="monotone" 
                  dataKey="prevented" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Prevented"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Report Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Report Status Breakdown</CardTitle>
            <CardDescription>
              Distribution of report statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4 space-x-6">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Species Reported */}
        <Card>
          <CardHeader>
            <CardTitle>Most Reported Species</CardTitle>
            <CardDescription>
              Species most commonly involved in illegal fishing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speciesData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="species" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hotspot Map */}
        <Card>
          <CardHeader>
            <CardTitle>Global Hotspots</CardTitle>
            <CardDescription>
              Regions with highest illegal fishing activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotspotData.map((hotspot, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-ocean">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{hotspot.region}</div>
                      <div className="text-sm text-muted-foreground">
                        {hotspot.lat}°, {hotspot.lng}°
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-destructive">{hotspot.incidents}</div>
                    <div className="text-xs text-muted-foreground">incidents</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t">
              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                View Interactive Heatmap
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}