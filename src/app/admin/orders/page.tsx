
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockOrders } from "@/lib/data";
import type { Order } from "@/types";
import { Eye, Edit, Search, Filter } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch orders from an API
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order => 
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     order.userId.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
        prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        )
    );
    toast({title: "Order Status Updated", description: `Order ${orderId} is now ${newStatus}.`});
  };

  const orderStatuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Orders</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>View and manage customer orders.</CardDescription>
          <div className="flex flex-wrap gap-4 mt-4 items-end">
            <div className="relative flex-grow min-w-[200px]">
                <Label htmlFor="search-orders" className="sr-only">Search Orders</Label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    id="search-orders"
                    placeholder="Search by Order ID or User ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex-grow min-w-[150px]">
                <Label htmlFor="status-filter" className="sr-only">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                    <SelectTrigger id="status-filter">
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {orderStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(newStatus) => handleStatusChange(order.id, newStatus as Order['status'])}>
                        <SelectTrigger className={`h-8 text-xs w-[120px] ${order.status === 'Delivered' ? 'border-green-500 text-green-700' : order.status === 'Shipped' ? 'border-blue-500 text-blue-700' : 'border-yellow-500 text-yellow-700'}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                             {orderStatuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/account/orders/${order.id}`}>
                       {/* This link might need to be an admin specific order view if different from user view */}
                       <Button variant="ghost" size="icon" className="mr-1 hover:text-primary" title="View Order">
                         <Eye className="h-4 w-4" />
                       </Button>
                    </Link>
                    {/* <Button variant="ghost" size="icon" className="hover:text-destructive" title="Delete Order (use with caution)">
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No orders found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
