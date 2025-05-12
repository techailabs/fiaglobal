import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Calendar, BarChart2, ArrowUp } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import AlertsList from "@/components/dashboard/AlertsList";
import { Button } from "@/components/ui/button";
import { Transaction } from "@shared/schema";
import { fetchTable } from "@/lib/supabase";

const AdminDashboard = () => {
  const [dateFilter, setDateFilter] = useState("last7Days");

  // Fetch transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/transactions'],
    queryFn: async () => {
      const data = await fetchTable('transactions');
      return data as Transaction[];
    }
  });

  // Fetch alerts
  const { data: alertsData, isLoading: alertsLoading } = useQuery({
    queryKey: ['/api/alerts'],
    queryFn: async () => {
      const data = await fetchTable('alerts');
      return data || [];
    }
  });

  // Format alerts
  const alerts = (alertsData || []).map(alert => ({
    id: alert.id,
    type: alert.severity === 'critical' ? 'error' : 
          alert.severity === 'warning' ? 'warning' : 
          alert.severity === 'success' ? 'success' : 'info',
    title: alert.title,
    description: alert.description,
    timestamp: new Date(alert.created_at).toLocaleString()
  }));

  return (
    <MainLayout>
      <Helmet>
        <title>Admin Dashboard | Fia Global</title>
        <meta name="description" content="Admin dashboard for Fia Global Bank Correspondent System" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and key metrics</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Last 7 Days
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Transactions"
          value="12,543"
          icon={<i className="ri-exchange-dollar-line"></i>}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
          trend={{
            value: "12%",
            label: "vs last week",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Active CSP Agents"
          value="127"
          icon={<i className="ri-user-star-line"></i>}
          iconBgColor="bg-green-100"
          iconColor="text-accent"
          trend={{
            value: "3%",
            label: "vs last month",
            isPositive: true
          }}
        />
        
        <StatCard
          title="Pending Audits"
          value="23"
          icon={<i className="ri-error-warning-line"></i>}
          iconBgColor="bg-red-100"
          iconColor="text-alert"
          trend={{
            value: "8%",
            label: "vs last week",
            isPositive: false
          }}
        />
        
        <StatCard
          title="New Customers"
          value="456"
          icon={<i className="ri-user-add-line"></i>}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          trend={{
            value: "18%",
            label: "vs last month",
            isPositive: true
          }}
        />
      </div>

      {/* Transactions and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TransactionTable 
            transactions={transactions || []}
            isLoading={transactionsLoading}
            viewAllLink="/admin/transactions"
          />
        </div>
        <div>
          <AlertsList 
            alerts={alerts} 
            viewAllLink="/admin/alerts"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Regional Performance</h2>
          </div>
          <div className="p-4 h-64 flex items-center justify-center bg-gray-50">
            <div className="text-gray-400 text-center">
              <BarChart2 className="mx-auto h-12 w-12" />
              <p className="mt-2">Regional Transaction Chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Transaction Types</h2>
          </div>
          <div className="p-4 h-64 flex items-center justify-center bg-gray-50">
            <div className="text-gray-400 text-center">
              <i className="ri-pie-chart-line text-5xl"></i>
              <p className="mt-2">Transaction Type Distribution</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
