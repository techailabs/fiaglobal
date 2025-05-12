import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/useAuth";
import { Search, Filter, Calendar } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import TransactionTable from "@/components/dashboard/TransactionTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction, TransactionType, TransactionStatus } from "@shared/schema";
import { fetchTable } from "@/lib/supabase";

const TransactionsPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Fetch transactions for the CSP agent
  const { data: transactions, isLoading } = useQuery({
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

  // Apply filters whenever dependencies change
  useEffect(() => {
    if (!transactions) return;

    let filtered = [...transactions];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        (t.reference_id && t.reference_id.toLowerCase().includes(query)) ||
        (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(t => t.txn_type === typeFilter);
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (dateFilter === "today") {
        filtered = filtered.filter(t => new Date(t.timestamp) >= today);
      } else if (dateFilter === "week") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        filtered = filtered.filter(t => new Date(t.timestamp) >= weekStart);
      } else if (dateFilter === "month") {
        const monthStart = new Date(today);
        monthStart.setMonth(today.getMonth() - 1);
        filtered = filtered.filter(t => new Date(t.timestamp) >= monthStart);
      }
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setFilteredTransactions(filtered);
  }, [transactions, searchQuery, typeFilter, statusFilter, dateFilter]);

  return (
    <MainLayout>
      <Helmet>
        <title>Transaction History | Fia Global</title>
        <meta name="description" content="View and manage your transaction history" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">Transactions</h1>
          <p className="text-gray-600">View and manage all transactions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <i className="ri-exchange-funds-line mr-2"></i>
            New Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search transactions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="AEPS">AEPS</SelectItem>
            <SelectItem value="BBPS">BBPS</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="Withdrawal">Withdrawal</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <TransactionTable 
        transactions={filteredTransactions}
        isLoading={isLoading}
        title={`Transactions (${filteredTransactions.length})`}
        showViewAll={false}
        showPagination={true}
      />
    </MainLayout>
  );
};

export default TransactionsPage;
