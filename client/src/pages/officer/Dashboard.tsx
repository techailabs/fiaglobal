import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTable } from "@/lib/supabase";
import { formatCurrency, formatShortDate } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import { Transaction, ReliefClaim } from "@shared/schema";
import { BarChart, FileText } from "lucide-react";

const OfficerDashboard = () => {
  const { user } = useAuth();
  
  // Fetch CSP agents
  const { data: cspAgents } = useQuery({
    queryKey: ['/api/users/csp'],
    queryFn: async () => {
      const data = await fetchTable('users', [
        { column: 'role', value: 'csp_agent' }
      ]);
      return data || [];
    }
  });
  
  // Fetch transactions
  const { data: transactions } = useQuery({
    queryKey: ['/api/transactions'],
    queryFn: async () => {
      const data = await fetchTable('transactions');
      return data as Transaction[] || [];
    }
  });
  
  // Fetch relief claims
  const { data: reliefClaims, isLoading: reliefClaimsLoading } = useQuery({
    queryKey: ['/api/relief-claims'],
    queryFn: async () => {
      const data = await fetchTable('relief_claims');
      return data as ReliefClaim[] || [];
    }
  });
  
  // Calculate metrics
  const activeCSPs = cspAgents?.filter(agent => agent.status === "Active").length || 0;
  
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const monthlyTransactions = transactions?.filter(tx => new Date(tx.timestamp) >= thisMonth) || [];
  const monthlyTransactionVolume = monthlyTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  const pendingClaims = reliefClaims?.filter(claim => claim.status === "Pending").length || 0;
  
  // Top performing CSPs
  const cspTransactions = new Map<string, { count: number, volume: number }>();
  transactions?.forEach(tx => {
    if (tx.csp_agent_id) {
      if (!cspTransactions.has(tx.csp_agent_id)) {
        cspTransactions.set(tx.csp_agent_id, { count: 0, volume: 0 });
      }
      const cspData = cspTransactions.get(tx.csp_agent_id)!;
      cspData.count += 1;
      cspData.volume += tx.amount;
    }
  });
  
  const topCSPs = Array.from(cspTransactions.entries())
    .map(([id, data]) => ({
      id,
      count: data.count,
      volume: data.volume,
      agent: cspAgents?.find(agent => agent.id === id) || null
    }))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 4);
  
  return (
    <MainLayout>
      <Helmet>
        <title>Bank Officer Dashboard | Fia Global</title>
        <meta name="description" content="Bank officer dashboard for correspondent banking network oversight" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Bank Officer Dashboard</h1>
          <p className="text-gray-600">Correspondent banking network overview</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active CSP Agents"
          value={activeCSPs.toString()}
          icon={<i className="ri-team-line"></i>}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
          trend={{
            value: "5%",
            label: "vs last quarter",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Monthly Transaction Vol."
          value={formatCurrency(monthlyTransactionVolume)}
          icon={<i className="ri-exchange-dollar-line"></i>}
          iconBgColor="bg-green-100"
          iconColor="text-accent"
          trend={{
            value: "12%",
            label: "vs last month",
            isPositive: true
          }}
        />
        
        <StatCard
          title="New Accounts (MTD)"
          value="1,284"
          icon={<i className="ri-user-add-line"></i>}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          trend={{
            value: "9%",
            label: "vs target",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Relief Claims"
          value={reliefClaims?.length.toString() || "0"}
          icon={<i className="ri-hand-heart-line"></i>}
          iconBgColor="bg-red-100"
          iconColor="text-alert"
          trend={{
            value: `${pendingClaims} Pending`,
            label: ""
          }}
        />
      </div>

      {/* Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow lg:col-span-3">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Regional Performance</h2>
          </div>
          <div className="p-4">
            <div className="h-80 bg-neutral-light rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart className="h-12 w-12 mx-auto mb-2" />
                <p className="mt-2">Regional performance metrics visualization</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader className="p-4 border-b">
            <CardTitle className="font-semibold text-gray-800">Top Performing CSPs</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {topCSPs.length > 0 ? (
                topCSPs.map((csp, index) => (
                  <div key={csp.id} className="p-3 bg-neutral-light rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-primary font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {csp.agent?.full_name || `CSP ID: ${csp.id.substring(0, 8)}`}
                          </p>
                          <p className="text-xs text-gray-600">
                            {csp.agent?.phone || "Contact information unavailable"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatCurrency(csp.volume)}</p>
                        <p className="text-xs text-gray-500">{csp.count} Transactions</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <i className="ri-bar-chart-grouped-line text-5xl text-gray-300 mb-2"></i>
                  <p>No transaction data available</p>
                </div>
              )}
              
              <div className="mt-4 text-right">
                <a href="#" className="text-sm text-primary hover:underline">View all rankings →</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Relief Claims */}
      <Card className="mb-8">
        <CardHeader className="p-4 border-b flex items-center justify-between">
          <CardTitle className="font-semibold text-gray-800">Pending Relief Claims</CardTitle>
          <a href="/officer/relief" className="text-primary text-sm hover:underline">View All</a>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-dark">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CSP Agent</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filed On</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-light">
                {reliefClaimsLoading ? (
                  Array(4).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </td>
                    </tr>
                  ))
                ) : reliefClaims && reliefClaims.length > 0 ? (
                  reliefClaims.slice(0, 4).map((claim) => (
                    <tr key={claim.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        #{claim.id.substring(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          {claim.csp_agent_id.substring(0, 8)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {claim.transaction_id ? 
                          `#${claim.transaction_id.substring(0, 8)}` : 
                          "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatCurrency(claim.amount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatShortDate(claim.filed_date)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={claim.status} />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <Button variant="link" className="p-0 h-auto text-primary">
                            {claim.status === "Pending" ? "Review" : "View"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                      No relief claims found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-4 border-b">
            <CardTitle className="font-semibold text-gray-800">Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-gray-400 text-center">
                <i className="ri-pie-chart-line text-5xl"></i>
                <p className="mt-2">Compliance Status Distribution</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-green-50 rounded p-2 text-center">
                <p className="text-xs text-gray-600">Compliant</p>
                <p className="text-lg font-semibold text-accent">89%</p>
              </div>
              <div className="bg-yellow-50 rounded p-2 text-center">
                <p className="text-xs text-gray-600">Minor Issues</p>
                <p className="text-lg font-semibold text-warning">7%</p>
              </div>
              <div className="bg-red-50 rounded p-2 text-center">
                <p className="text-xs text-gray-600">Non-Compliant</p>
                <p className="text-lg font-semibold text-alert">4%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 border-b">
            <CardTitle className="font-semibold text-gray-800">Recent System Updates</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="p-3 bg-neutral-light rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="ri-arrow-up-circle-line text-accent"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">System Update: v2.5.1</p>
                    <p className="text-xs text-gray-600 mt-1">Enhanced security features and bug fixes to the transaction system.</p>
                    <p className="text-xs text-gray-500 mt-1">Deployed: May 2, 2023</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-light rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="ri-file-paper-2-line text-primary"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">New Policy Document</p>
                    <p className="text-xs text-gray-600 mt-1">Updated KYC verification guidelines for rural customers.</p>
                    <p className="text-xs text-gray-500 mt-1">Published: April 28, 2023</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-light rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="ri-bank-line text-blue-600"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">RBI Compliance Update</p>
                    <p className="text-xs text-gray-600 mt-1">New reporting format for correspondent banking transactions.</p>
                    <p className="text-xs text-gray-500 mt-1">Effective: April 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <a href="#" className="text-sm text-primary hover:underline">View all updates →</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default OfficerDashboard;
