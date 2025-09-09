import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Eye, Search, Filter, MapPin, Calendar, Fish } from "lucide-react";

const allReports = [
  { id: "RPT-001", species: "Bluefin Tuna", location: "Pacific Ocean, 34°N 120°W", date: "2024-01-15", status: "pending", reporter: "Coastal Guard Unit 7", evidence: "Photo, GPS coordinates" },
  { id: "RPT-002", species: "Atlantic Salmon", location: "North Atlantic, 60°N 20°W", date: "2024-01-14", status: "approved", reporter: "Marine Patrol", evidence: "Video, Witness statement" },
  { id: "RPT-003", species: "Atlantic Cod", location: "Baltic Sea, 55°N 15°E", date: "2024-01-14", status: "rejected", reporter: "Anonymous", evidence: "Photo only" },
  { id: "RPT-004", species: "Hammerhead Shark", location: "Indian Ocean, 10°S 85°E", date: "2024-01-13", status: "pending", reporter: "NGO Observer", evidence: "Video, GPS track" },
  { id: "RPT-005", species: "Spanish Mackerel", location: "Mediterranean, 40°N 8°E", date: "2024-01-12", status: "approved", reporter: "Fisherman Association", evidence: "Photo, Documentation" },
  { id: "RPT-006", species: "Yellowfin Tuna", location: "Pacific Ocean, 20°N 155°W", date: "2024-01-11", status: "pending", reporter: "Research Vessel", evidence: "Sonar data, Photos" },
  { id: "RPT-007", species: "Sea Bass", location: "Atlantic Ocean, 45°N 50°W", date: "2024-01-10", status: "approved", reporter: "Coast Guard", evidence: "Video, Vessel tracking" },
  { id: "RPT-008", species: "Red Snapper", location: "Gulf of Mexico, 25°N 90°W", date: "2024-01-09", status: "rejected", reporter: "Tourist", evidence: "Blurry photo" },
];

export function ReportListView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
          <CardDescription>Search and filter illegal fishing reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search by species, location, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
          <CardDescription>Manage and review illegal fishing reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Fish className="w-4 h-4 text-primary" />
                      <span>{report.species}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{report.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{report.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Report Details - {report.id}</DialogTitle>
                            <DialogDescription>
                              Review and take action on this illegal fishing report
                            </DialogDescription>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="mb-2 font-medium">Species Information</h4>
                                  <p className="text-sm text-muted-foreground">{selectedReport.species}</p>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Current Status</h4>
                                  {getStatusBadge(selectedReport.status)}
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Location</h4>
                                  <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Report Date</h4>
                                  <p className="text-sm text-muted-foreground">{selectedReport.date}</p>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Reporter</h4>
                                  <p className="text-sm text-muted-foreground">{selectedReport.reporter}</p>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium">Evidence</h4>
                                  <p className="text-sm text-muted-foreground">{selectedReport.evidence}</p>
                                </div>
                              </div>

                              <div className="pt-4 border-t">
                                <h4 className="mb-4 font-medium">Evidence Preview</h4>
                                <div className="p-8 text-center rounded-lg bg-muted/50">
                                  <div className="space-y-2">
                                    <Eye className="w-12 h-12 mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Evidence files would be displayed here</p>
                                    <p className="text-xs text-muted-foreground">(Photos, Videos, GPS data, etc.)</p>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 border-t">
                                <h4 className="mb-4 font-medium">Location on Map</h4>
                                <div className="p-8 text-center border rounded-lg bg-gradient-wave">
                                  <div className="space-y-2">
                                    <MapPin className="w-12 h-12 mx-auto text-primary" />
                                    <p className="text-sm text-muted-foreground">Interactive map would be displayed here</p>
                                    <p className="text-xs text-muted-foreground">Showing exact coordinates and surrounding area</p>
                                  </div>
                                </div>
                              </div>

                              {selectedReport.status === "pending" && (
                                <div className="flex justify-end pt-4 space-x-4 border-t">
                                  <Button variant="destructive">
                                    Reject Report
                                  </Button>
                                  <Button variant="default">
                                    Approve Report
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {report.status === "pending" && (
                        <>
                          <Button variant="default" size="sm">
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}