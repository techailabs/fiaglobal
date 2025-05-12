import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatShortDate, formatTime } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Transaction } from "@shared/schema";

interface TransactionTableProps {
  transactions: Transaction[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  showActions?: boolean;
  onViewDetails?: (id: string) => void;
  showPagination?: boolean;
  isLoading?: boolean;
}

const TransactionTable = ({
  transactions,
  title = "Recent Transactions",
  showViewAll = true,
  viewAllLink = "/transactions",
  showActions = true,
  onViewDetails,
  showPagination = false,
  isLoading = false,
}: TransactionTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  
  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / pageSize);
  const paginatedTransactions = showPagination 
    ? transactions.slice((page - 1) * pageSize, page * pageSize)
    : transactions;
    
  return (
    <Card>
      <CardHeader className="p-4 border-b flex items-center justify-between">
        <CardTitle className="font-semibold text-gray-800">{title}</CardTitle>
        {showViewAll && (
          <a href={viewAllLink} className="text-primary text-sm hover:underline">
            View All
          </a>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                {showActions && (
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-14"></div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                    </TableCell>
                    {showActions && (
                      <TableCell className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      #{transaction.reference_id || transaction.id.substring(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.description || "User Transaction"}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {transaction.txn_type}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {formatShortDate(transaction.timestamp)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    {showActions && (
                      <TableCell className="px-4 py-3 text-sm">
                        {onViewDetails ? (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-primary hover:underline"
                            onClick={() => onViewDetails(transaction.id)}
                          >
                            Details
                          </Button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                              <DropdownMenuItem>Report Issue</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={showActions ? 7 : 6} 
                    className="px-4 py-6 text-sm text-center text-gray-500"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {showPagination && totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
