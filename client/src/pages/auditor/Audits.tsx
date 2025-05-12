import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronRight, Filter, MapPin, Plus, Search } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { Audit } from "@shared/schema";
import { fetchTable } from "@/lib/supabase";
import { formatShortDate } from "@/lib/utils";

const AuditsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("planned");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  
  // Fetch audits
  const { data: audits, isLoading } = useQuery({
    queryKey: ['/api/audits'],
    queryFn: async () => {
      if (!user?.id) return [];
      const data = await fetchTable('audits', [
        { column: 'auditor_id', value: user.id }
      ]);
      return data as Audit[];
    },
    enabled: !!user?.id
  });
  
  // Filter audits based on tab and search
  const filteredAudits = audits?.filter(audit => {
    const matchesTab = 
      (activeTab === "planned" && audit.status === "Pending") ||
      (activeTab === "completed" && (audit.status === "Completed" || audit.status === "NonCompliant"));
    
    const matchesSearch = 
      searchQuery === "" || 
      audit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.csp_id.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesTab && matchesSearch;
  }) || [];
  
  // Sort by scheduled date (planned) or timestamp (completed)
  const sortedAudits = [...filteredAudits].sort((a, b) => {
    if (activeTab === "planned" && a.scheduled_date && b.scheduled_date) {
      return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
    } else {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });
  
  const handleAuditClick = (audit: Audit) => {
    setSelectedAudit(audit);
    setIsDetailsDialogOpen(true);
  };
  
  return (
    <MainLayout>
      <Helmet>
        <title>{activeTab === "planned" ? "Planned Audits" : "Completed Audits"} | Fia Global</title>
        <meta name="description" content="Manage and view status of compliance audits" />
      </Helmet>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Audits</h1>
          <p className="text-gray-600">Schedule, track, and review audits</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Schedule New Audit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Audit</DialogTitle>
                <DialogDescription>
                  Create a new audit appointment with a CSP agent
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="csp">CSP Agent</Label>
                  <Select>
                    <SelectTrigger id="csp">
                      <SelectValue placeholder="Select CSP agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csp1">Rohit Kumar (CSP-134)</SelectItem>
                      <SelectItem value="csp2">Priya Sharma (CSP-087)</SelectItem>
                      <SelectItem value="csp3">Rajesh Gupta (CSP-226)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Additional notes for the audit..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by audit ID or CSP..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North Region</SelectItem>
              <SelectItem value="south">South Region</SelectItem>
              <SelectItem value="east">East Region</SelectItem>
              <SelectItem value="west">West Region</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="planned" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="planned">Planned Audits</TabsTrigger>
          <TabsTrigger value="completed">Completed Audits</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Audits List */}
      <Card>
        <CardHeader className="p-4 border-b">
          <CardTitle className="font-semibold text-gray-800">
            {activeTab === "planned" ? "Upcoming Audits" : "Audit History"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse flex p-4 border-b">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedAudits.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {sortedAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center"
                  onClick={() => handleAuditClick(audit)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${activeTab === "planned" ? 'bg-purple-100 text-primary' : 
                          audit.status === "Completed" ? 'bg-green-100 text-accent' : 'bg-red-100 text-alert'}`}
                      >
                        {activeTab === "planned" ? 
                          <Calendar className="h-6 w-6" /> :
                          audit.status === "Completed" ? 
                            <i className="ri-checkbox-circle-line text-xl"></i> : 
                            <i className="ri-error-warning-line text-xl"></i>
                        }
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">Audit #{audit.id.substring(0, 8).toUpperCase()}</h3>
                        <StatusBadge 
                          status={audit.status === "NonCompliant" ? "Non-Compliant" : audit.status} 
                          className="ml-2"
                        />
                      </div>
                      <p className="text-sm text-gray-600">CSP Agent ID: {audit.csp_id.substring(0, 8)}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        {audit.gps_lat && audit.gps_long ? (
                          <>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>Location: {audit.gps_lat.toFixed(4)}, {audit.gps_long.toFixed(4)}</span>
                          </>
                        ) : null}
                        
                        <span className="ml-4">
                          {activeTab === "planned" && audit.scheduled_date 
                            ? `Scheduled: ${formatShortDate(audit.scheduled_date)}` 
                            : `Completed: ${formatShortDate(audit.timestamp)}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                {activeTab === "planned" ? (
                  <Calendar className="h-8 w-8 text-gray-400" />
                ) : (
                  <i className="ri-file-list-3-line text-3xl text-gray-400"></i>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No audits found</h3>
              <p className="text-gray-500 text-center max-w-md mb-4">
                {activeTab === "planned"
                  ? "You don't have any upcoming audits scheduled."
                  : "No completed audits match your search criteria."}
              </p>
              {activeTab === "planned" && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsScheduleDialogOpen(true)}
                >
                  Schedule New Audit
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Audit Details Dialog */}
      {selectedAudit && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                Audit #{selectedAudit.id.substring(0, 8).toUpperCase()}
                <StatusBadge 
                  status={selectedAudit.status === "NonCompliant" ? "Non-Compliant" : selectedAudit.status} 
                  className="ml-2"
                />
              </DialogTitle>
              <DialogDescription>
                {activeTab === "planned"
                  ? `Scheduled for ${selectedAudit.scheduled_date ? formatShortDate(selectedAudit.scheduled_date) : "N/A"}`
                  : `Conducted on ${formatShortDate(selectedAudit.timestamp)}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Audit Details</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">CSP ID:</span>
                    <span className="text-sm font-medium">{selectedAudit.csp_id.substring(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Audit Date:</span>
                    <span className="text-sm font-medium">
                      {activeTab === "planned" && selectedAudit.scheduled_date
                        ? formatShortDate(selectedAudit.scheduled_date)
                        : formatShortDate(selectedAudit.timestamp)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Verification Hash:</span>
                    <span className="text-sm font-medium">{selectedAudit.hash || "Not generated"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">GPS Coordinates:</span>
                    <span className="text-sm font-medium">
                      {selectedAudit.gps_lat && selectedAudit.gps_long 
                        ? `${selectedAudit.gps_lat.toFixed(4)}, ${selectedAudit.gps_long.toFixed(4)}`
                        : "Not recorded"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Audit Photos</h3>
                <div className="bg-gray-50 p-4 rounded-md h-40 flex items-center justify-center">
                  {selectedAudit.photos && selectedAudit.photos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedAudit.photos.map((photo, index) => (
                        <div key={index} className="bg-gray-200 rounded-md h-24 flex items-center justify-center">
                          <i className="ri-image-line text-gray-400 text-2xl"></i>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center">No photos available</p>
                  )}
                </div>
              </div>
              
              {/* Findings section for completed audits */}
              {activeTab === "completed" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-sm font-medium mb-2">Findings</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedAudit.findings ? (
                      <pre className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(selectedAudit.findings, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-gray-400 text-center">No findings recorded</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              {activeTab === "planned" ? (
                <>
                  <Button variant="outline" className="mr-2">
                    Reschedule
                  </Button>
                  <Button>
                    Start Audit
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="mr-2">
                    Export PDF
                  </Button>
                  <Button>
                    View Full Report
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

export default AuditsPage;
