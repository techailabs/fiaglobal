import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@shared/schema";
import { fetchTable } from "@/lib/supabase";
import { formatCurrency, formatShortDate } from "@/lib/utils";
import StatusBadge from "@/components/shared/StatusBadge";
import { HeadphonesIcon } from "lucide-react";

const CustomerDashboard = () => {
  const { user } = useAuth();
  
  // Fetch transactions for the customer
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/transactions/customer'],
    queryFn: async () => {
      if (!user?.id) return [];
      const data = await fetchTable('transactions', [
        { column: 'user_id', value: user.id }
      ]);
      return data as Transaction[];
    },
    enabled: !!user?.id
  });
  
  // Sort transactions by date (newest first)
  const sortedTransactions = transactions 
    ? [...transactions].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    : [];
  
  const recentTransactions = sortedTransactions.slice(0, 4);
  
  // Calculate balance
  const balance = sortedTransactions.reduce((sum, tx) => {
    // For deposits
    if (tx.txn_type === 'Cash' || tx.txn_type === 'Direct Benefit') {
      return sum + tx.amount;
    }
    // For withdrawals
    return sum - tx.amount;
  }, 24587.35); // Starting balance
  
  // Get last deposit
  const lastDeposit = sortedTransactions.find(tx => 
    tx.txn_type === 'Cash' || tx.txn_type === 'Direct Benefit'
  );
  
  // Count transactions by type
  const deposits = sortedTransactions.filter(tx => 
    tx.txn_type === 'Cash' || tx.txn_type === 'Direct Benefit'
  ).length;
  
  const withdrawals = sortedTransactions.filter(tx => 
    tx.txn_type === 'AEPS' || tx.txn_type === 'Withdrawal' || tx.txn_type === 'BBPS'
  ).length;
  
  return (
    <MainLayout>
      <Helmet>
        <title>Customer Dashboard | Fia Global</title>
        <meta name="description" content="Access your banking account, view transactions, and manage services" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.full_name.split(' ')[0]}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center">
            <HeadphonesIcon className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-primary mb-3">
            <i className="ri-history-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">Transaction History</span>
        </a>
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-accent mb-3">
            <i className="ri-bank-card-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">Link Accounts</span>
        </a>
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
            <i className="ri-file-list-3-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">Statement</span>
        </a>
        <a href="#" className="bg-white rounded-lg shadow flex flex-col items-center p-4 hover:bg-neutral-light transition duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-3">
            <i className="ri-message-2-line text-xl"></i>
          </div>
          <span className="text-sm font-medium text-gray-700">Complaints</span>
        </a>
      </div>

      {/* Account Summary */}
      <Card className="mb-8">
        <CardHeader className="p-4 border-b">
          <CardTitle className="font-semibold text-gray-800">Account Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-primary to-purple-700 rounded-lg text-white p-4">
              <p className="text-sm font-medium opacity-90">Savings Account</p>
              <p className="text-xl font-bold mt-2">{formatCurrency(balance)}</p>
              <p className="text-xs mt-4 opacity-90">Acc No: XXXX XXXX 3879</p>
            </div>
            
            <div className="bg-neutral-light rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700">Available Balance</p>
              <p className="text-xl font-bold text-gray-800 mt-2">{formatCurrency(balance)}</p>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                {lastDeposit && (
                  <>
                    <i className="ri-arrow-up-line text-accent mr-1"></i>
                    <span>Last transaction: +{formatCurrency(lastDeposit.amount)} ({formatShortDate(lastDeposit.timestamp)})</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-neutral-light rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700">Monthly Transactions</p>
              <p className="text-xl font-bold text-gray-800 mt-2">{sortedTransactions.length}</p>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>{deposits} deposits, {withdrawals} withdrawals</span>
              </div>
            </div>
            
            <div className="bg-neutral-light rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700">Linked Benefits</p>
              <p className="text-xl font-bold text-gray-800 mt-2">2</p>
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <span>PM Kisan, Scholarship</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="mb-8">
        <CardHeader className="p-4 border-b flex items-center justify-between">
          <CardTitle className="font-semibold text-gray-800">Recent Transactions</CardTitle>
          <a href="/customer/transactions" className="text-primary text-sm hover:underline">View All</a>
        </CardHeader>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-dark">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-light">
                {transactionsLoading ? (
                  Array(4).fill(0).map((_, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                      </td>
                    </tr>
                  ))
                ) : recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatShortDate(transaction.timestamp)}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.description || `${transaction.txn_type} Transaction`}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <span className={transaction.txn_type === 'Cash' || transaction.txn_type === 'Direct Benefit' ? 'text-accent' : 'text-alert'}>
                          {transaction.txn_type === 'Cash' || transaction.txn_type === 'Direct Benefit' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.txn_type}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={transaction.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="p-4 border-b">
          <CardTitle className="font-semibold text-gray-800">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-information-line text-blue-500"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800 font-medium">KYC Update Required</p>
                  <p className="text-xs text-gray-600 mt-1">Please update your KYC documents by visiting your nearest CSP agent.</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-bank-card-line text-accent"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800 font-medium">Direct Benefit Transfer Received</p>
                  <p className="text-xs text-gray-600 mt-1">You have received ₹2,000 under PM Kisan scheme.</p>
                  <p className="text-xs text-gray-500 mt-1">April 15, 2023</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-light rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-bank-line text-gray-500"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-800 font-medium">New Banking Services Available</p>
                  <p className="text-xs text-gray-600 mt-1">Now access micro-insurance and recurring deposit services at your local CSP.</p>
                  <p className="text-xs text-gray-500 mt-1">April 10, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CustomerDashboard;
