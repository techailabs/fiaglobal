import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { fetchTable } from "@/lib/supabase";
import { Audit } from "@shared/schema";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatShortDate } from "@/lib/utils";

const AuditorDashboard = () => {
  const { user } = useAuth();
  
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

  // Calculate audit statistics
  const pendingAudits = audits?.filter(a => a.status === 'Pending') || [];
  const completedAudits = audits?.filter(a => a.status === 'Completed') || [];
  const nonCompliantAudits = audits?.filter(a => a.status === 'NonCompliant') || [];
  
  const currentMonthCompleted = completedAudits.filter(a => {
    const auditDate = new Date(a.timestamp);
    const now = new Date();
    return auditDate.getMonth() === now.getMonth() && auditDate.getFullYear() === now.getFullYear();
  });
  
  // Get today's upcoming audit
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const upcomingAudits = pendingAudits
    .filter(a => a.scheduled_date && new Date(a.scheduled_date) >= today)
    .sort((a, b) => new Date(a.scheduled_date!).getTime() - new Date(b.scheduled_date!).getTime());
  
  const nextAudit = upcomingAudits.length > 0 ? upcomingAudits[0] : null;
  
  const getNextAuditTime = () => {
    if (!nextAudit || !nextAudit.scheduled_date) return "No upcoming audits";
    const date = new Date(nextAudit.scheduled_date);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return formatShortDate(date);
    }
  };
  
  // Fetch CSPs for audit coverage calculation
  const { data: users } = useQuery({
    queryKey: ['/api/users/csp'],
    queryFn: async () => {
      const data = await fetchTable('users', [
        { column: 'role', value: 'csp_agent' }
      ]);
      return data || [];
    }
  });
  
  // Calculate CSP coverage
  const totalCSPs = users?.length || 0;
  const auditedCSPIds = new Set(completedAudits.map(a => a.csp_id));
  const coverage = totalCSPs > 0 ? Math.round((auditedCSPIds.size / totalCSPs) * 100) : 0;

  return (
    <MainLayout>
      <Helmet>
        <title>Auditor Dashboard | Fia Global</title>
        <meta name="description" content="Auditor dashboard for monitoring compliance and verification" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Auditor Dashboard</h1>
          <p className="text-gray-600">Compliance monitoring and verification</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center">
            <i className="ri-add-line mr-2"></i>
            Schedule New Audit
          </Button>
        </div>
      </div>

      {/* Audit Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Pending Audits"
          value={pendingAudits.length.toString()}
          icon={<i className="ri-calendar-check-line"></i>}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
          trend={{
            value: getNextAuditTime(),
            label: "Next audit"
          }}
        />
        
        <StatCard
          title="Completed (This Month)"
          value={currentMonthCompleted.length.toString()}
          icon={<i className="ri-checkbox-circle-line"></i>}
          iconBgColor="bg-green-100"
          iconColor="text-accent"
          trend={{
            value: "23%",
            label: "vs last month",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Non-Compliance"
          value={nonCompliantAudits.length.toString()}
          icon={<i className="ri-error-warning-line"></i>}
          iconBgColor="bg-red-100"
          iconColor="text-alert"
          trend={{
            value: "",
            label: "Requiring immediate action"
          }}
        />
        
        <StatCard
          title="CSP Coverage"
          value={`${coverage}%`}
          icon={<i className="ri-user-star-line"></i>}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          trend={{
            value: "",
            label: "Target: 95%"
          }}
        />
      </div>

      {/* Audits Map */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800">Geographic Distribution</h2>
        </div>
        <div className="p-4">
          <div className="h-80 bg-neutral-light rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="mt-2">Interactive Audit Map</p>
              <p className="text-xs mt-1">Showing geographic distribution of CSP agents and audit status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="p-4 border-b flex items-center justify-between">
            <CardTitle className="font-semibold text-gray-800">Upcoming Audits</CardTitle>
            <a href="/auditor/planned" className="text-primary text-sm hover:underline">View All</a>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-3 bg-gray-100 rounded-md animate-pulse h-20"></div>
                ))}
              </div>
            ) : upcomingAudits.length > 0 ? (
              <div className="space-y-4">
                {upcomingAudits.slice(0, 3).map((audit, index) => (
                  <div key={audit.id} className={`p-3 ${index === 0 ? 'bg-purple-50' : 'bg-neutral-light'} rounded-md flex items-center justify-between`}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full ${index === 0 ? 'bg-purple-200 text-primary' : 'bg-gray-200 text-gray-600'} flex items-center justify-center`}>
                          <i className="ri-user-line"></i>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">CSP ID: {audit.csp_id.substring(0, 8)}</p>
                        <p className="text-xs text-gray-600">Scheduled Audit</p>
                        <p className={`text-xs ${index === 0 ? 'text-primary' : 'text-gray-600'} font-medium mt-1`}>
                          {audit.scheduled_date ? formatShortDate(audit.scheduled_date) : 'Not scheduled'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={index === 0 ? "default" : "outline"} 
                      size="sm" 
                      className="text-xs"
                    >
                      {index === 0 ? 'Start' : 'Prepare'}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>No upcoming audits scheduled</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Schedule New Audit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 border-b flex items-center justify-between">
            <CardTitle className="font-semibold text-gray-800">Non-Compliance Issues</CardTitle>
            <a href="#" className="text-primary text-sm hover:underline">View All</a>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-3 bg-gray-100 rounded-md animate-pulse h-24"></div>
                ))}
              </div>
            ) : nonCompliantAudits.length > 0 ? (
              <div className="space-y-4">
                {nonCompliantAudits.slice(0, 3).map((audit) => (
                  <div key={audit.id} className="p-3 bg-red-50 border-l-4 border-alert rounded-r-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="ri-error-warning-line text-alert"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-800 font-medium">
                          Non-compliance detected in audit #{audit.id.substring(0, 8)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          CSP ID: {audit.csp_id.substring(0, 8)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-gray-500">Reported: {formatShortDate(audit.timestamp)}</p>
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-alert">Critical</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="ri-checkbox-circle-line text-5xl text-green-500 mb-2"></i>
                <p>No non-compliance issues detected</p>
                <p className="text-sm mt-2">All audited CSPs are following compliance guidelines</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Audit Reports */}
      <Card>
        <CardHeader className="p-4 border-b flex items-center justify-between">
          <CardTitle className="font-semibold text-gray-800">Recent Audit Reports</CardTitle>
          <a href="/auditor/completed" className="text-primary text-sm hover:underline">View All</a>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-dark">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CSP Agent</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-light">
                {isLoading ? (
                  [1, 2, 3, 4].map(i => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                      </td>
                    </tr>
                  ))
                ) : completedAudits.length > 0 ? (
                  completedAudits.slice(0, 4).map((audit) => (
                    <tr key={audit.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">#{audit.id.substring(0, 8).toUpperCase()}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">CSP ID: {audit.csp_id.substring(0, 8)}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {audit.gps_lat && audit.gps_long ? `${audit.gps_lat.toFixed(2)}, ${audit.gps_long.toFixed(2)}` : 'Location data unavailable'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatShortDate(audit.timestamp)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={audit.status === 'NonCompliant' ? 'Non-Compliant' : audit.status} />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="link" className="p-0 h-auto text-primary">View</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      No completed audits found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AuditorDashboard;
