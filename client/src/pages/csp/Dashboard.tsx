import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Transaction } from "@shared/schema";
import { fetchTable } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

const CSPDashboard = () => {
  const { user } = useAuth();

  // Fetch transactions for the CSP agent
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/transactions/csp'],
    queryFn: async () => {
      if (!user?.id) return [];
      const data = await fetchTable('transactions', [
        { column: 'csp_agent_id', value: user.id }
      ]);
      return data as Transaction[];
    },
    enabled: !!user?.id
  });

  // Calculate transaction statistics
  const todayTransactions = transactions?.filter(t => 
    new Date(t.timestamp).toDateString() === new Date().toDateString()
  ) || [];
  
  const todayCount = todayTransactions.length;
  const todayVolume = todayTransactions.reduce((sum, t) => sum + t.amount, 0);
  const todayCommission = Math.round(todayVolume * 0.02); // Assume 2% commission

  return (
    <MainLayout>
      <Helmet>
        <title>CSP Dashboard | Fia Global</title>
        <meta name="description" content="CSP Agent dashboard for transactions and customer management" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">CSP Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.full_name.split(' ')[0]}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Button>
            <i className="ri-exchange-funds-line mr-2"></i>
            New Transaction
          </Button>
          <Button variant="secondary">
            <i className="ri-user-add-line mr-2"></i>
            Add Customer
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-primary mb-3">
            <i className="ri-bank-card-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">AEPS</span>
        </a>
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-accent mb-3">
            <i className="ri-bill-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">BBPS</span>
        </a>
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
            <i className="ri-money-dollar-circle-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">Cash Deposit</span>
        </a>
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-3">
            <i className="ri-hand-coin-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">Withdrawal</span>
        </a>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Transactions"
          value={todayCount.toString()}
          icon={<i className="ri-exchange-dollar-line"></i>}
          iconBgColor="bg-purple-100"
          iconColor="text-primary"
          progress={{
            current: todayCount,
            target: 36,
            label: "Daily Target"
          }}
        />
        
        <StatCard
          title="Today's Volume"
          value={formatCurrency(todayVolume)}
          icon={<i className="ri-funds-line"></i>}
          iconBgColor="bg-green-100"
          iconColor="text-accent"
          progress={{
            current: todayVolume,
            target: 40000,
            label: "Daily Target"
          }}
        />
        
        <StatCard
          title="New Customers"
          value="3"
          icon={<i className="ri-user-heart-line"></i>}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          progress={{
            current: 3,
            target: 10,
            label: "Daily Target"
          }}
        />
        
        <StatCard
          title="Commission"
          value={formatCurrency(todayCommission)}
          icon={<i className="ri-hand-coin-line"></i>}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
          trend={{
            value: "12%",
            label: "vs yesterday",
            isPositive: true
          }}
        />
      </div>

      {/* Recent Transactions */}
      <div className="mb-8">
        <TransactionTable 
          transactions={transactions || []}
          isLoading={transactionsLoading}
          title="Recent Transactions"
          viewAllLink="/csp/transactions"
          showActions={true}
        />
      </div>

      {/* System Notifications */}
      <Card>
        <CardHeader className="p-4 border-b">
          <CardTitle className="font-semibold text-gray-800">System Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-information-line text-blue-500"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800 font-medium">Scheduled Maintenance Alert</p>
                  <p className="text-xs text-gray-600 mt-1">The system will be under maintenance from 1:00 AM to 2:00 AM tomorrow. Plan your transactions accordingly.</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-accent"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800 font-medium">Audit Scheduled for Next Week</p>
                  <p className="text-xs text-gray-600 mt-1">Your quarterly audit is scheduled for next Tuesday (May 10). Please ensure all your documents are updated.</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-light rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-money-dollar-circle-line text-gray-500"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800 font-medium">Commission Rate Update</p>
                  <p className="text-xs text-gray-600 mt-1">Commission rates for AEPS transactions have been updated. Check the updated rates in your dashboard.</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CSPDashboard;
