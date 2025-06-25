
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockOrders } from "@/lib/data";
import type { Order } from "@/types";
import { Eye, Search, Filter } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/LanguageContext';


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order => 
    (order.id.toLowerCase().includes(appliedSearchTerm.toLowerCase()) || 
     order.userId.toLowerCase().includes(appliedSearchTerm.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
        prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        )
    );
    toast({title: t('admin.orderStatusUpdatedToastTitle'), description: t('admin.orderStatusUpdatedToastDescription', {orderId, newStatus})});
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
  };

  const orderStatuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin.manageOrdersTitle')}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.orderListCardTitle')}</CardTitle>
          <CardDescription>{t('admin.orderListCardDescription')}</CardDescription>
          <div className="flex flex-wrap gap-4 mt-4 items-end">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-grow min-w-[250px]">
                <div className="relative flex-grow">
                  <Label htmlFor="search-orders" className="sr-only">{t('admin.searchOrdersLabel')}</Label>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                      id="search-orders"
                      placeholder={t('admin.searchOrdersPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                  />
                </div>
                <Button type="submit">{t('admin.searchButton')}</Button>
            </form>
            <div className="flex-grow min-w-[150px]">
                <Label htmlFor="status-filter" className="sr-only">{t('admin.filterByStatusLabel')}</Label>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                    <SelectTrigger id="status-filter">
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder={t('admin.filterByStatusPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t('admin.allStatuses')}</SelectItem>
                        {orderStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem> // Statuses are data
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
                <TableHead>{t('admin.orderIdColumn')}</TableHead>
                <TableHead>{t('admin.customerIdColumn')}</TableHead>
                <TableHead>{t('admin.dateColumn')}</TableHead>
                <TableHead className="text-right">{t('admin.totalColumn')}</TableHead>
                <TableHead>{t('admin.statusColumn')}</TableHead>
                <TableHead className="text-center w-[120px]">{t('admin.actionsColumn')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{order.totalAmount.toFixed(2)} MDL</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(newStatus) => handleStatusChange(order.id, newStatus as Order['status'])}>
                        <SelectTrigger className={`h-8 text-xs w-[120px] ${order.status === 'Delivered' ? 'border-green-500 text-green-700' : order.status === 'Shipped' ? 'border-blue-500 text-blue-700' : 'border-yellow-500 text-yellow-700'}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                             {orderStatuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem> // Statuses are data
                            ))}
                        </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/account/orders/${order.id}`}>
                       <Button variant="ghost" size="icon" className="mr-1 hover:text-primary" title={t('admin.viewOrderTooltip')}>
                         <Eye className="h-4 w-4" />
                       </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">{t('admin.noOrdersFound')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
