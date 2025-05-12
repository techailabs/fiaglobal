import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import StatusBadge from "@/components/shared/StatusBadge";
import { fetchTable } from "@/lib/supabase";
import { apiRequest } from "@/lib/queryClient";
import { MoreHorizontal, Search, UserPlus } from "lucide-react";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ['/api/users'],
    queryFn: async () => {
      const data = await fetchTable('users');
      return data as User[];
    }
  });

  // Toggle user status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ userId, newStatus }: { userId: string; newStatus: string }) => {
      return apiRequest('PATCH', `/api/users/${userId}`, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: "User updated",
        description: "User status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  });

  // Filter users based on search
  const filteredUsers = users?.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    toggleStatusMutation.mutate({ userId, newStatus });
  };

  return (
    <MainLayout>
      <Helmet>
        <title>User Management | Fia Global</title>
        <meta name="description" content="Manage users within the Fia Global Bank Correspondent System" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">User Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-gray-500">User addition form would go here</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users by name, email, or role..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users table */}
      <Card>
        <CardHeader className="p-4 border-b">
          <CardTitle className="font-semibold text-gray-800">System Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(0).map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-4 py-3 font-medium text-gray-900">
                        {user.full_name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-900">{user.email}</TableCell>
                      <TableCell className="px-4 py-3 text-gray-900">
                        {user.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-900">{user.phone}</TableCell>
                      <TableCell className="px-4 py-3">
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log("Edit", user.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                              {user.status === "Active" ? "Suspend" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("Reset password", user.id)}>
                              Reset Password
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="px-4 py-6 text-sm text-center text-gray-500">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default UserManagement;
