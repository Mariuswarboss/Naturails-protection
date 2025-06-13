"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockOrders, mockUsers } from '@/lib/data'; // Assuming mockUsers for user data
import type { Order, User, Address as AddressType } from '@/types';
import Link from 'next/link';
import { Package, MapPin, User as UserIcon, CreditCard, LogOut, Edit3 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Mock function to get current user
const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    if (token && email) {
      const user = mockUsers.find(u => u.email === email);
      if (user) return { ...user, name: name || user.name }; // Use stored name if available
      // Fallback for newly signed up user not in mockUsers
      return { id: 'new-user', email, name: name || 'New User', addresses: [] };
    }
  }
  return null;
};

const UserProfileForm = ({ user, onSave }: { user: User, onSave: (updatedUser: User) => void }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    const updatedUser = { ...user, name, email };
    onSave(updatedUser); // This would update local state/context
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
    }
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="profile-name">Full Name</Label>
        <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="profile-email">Email</Label>
        <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

const AddressManager = ({ addresses, onSaveAddress, onDeleteAddress }: { addresses: AddressType[], onSaveAddress: (address: AddressType) => void, onDeleteAddress: (addressId: string) => void }) => {
  // Basic address management UI. For a real app, this would involve forms for adding/editing addresses.
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Your Addresses</h3>
      {addresses && addresses.length > 0 ? (
        <ul className="space-y-2">
          {addresses.map(addr => (
            <li key={addr.id} className="p-3 border rounded-md bg-muted/50">
              <p>{addr.street}, {addr.city}, {addr.postalCode}</p>
              <p>{addr.country} {addr.isDefault && <span className="text-xs text-primary ml-2">(Default)</span>}</p>
              {/* Add Edit/Delete buttons here */}
            </li>
          ))}
        </ul>
      ) : <p>No addresses saved.</p>}
      <Button variant="outline" className="mt-4">Add New Address</Button>
    </div>
  );
};


export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(user);
      // Filter orders for the current user
      const orders = mockOrders.filter(order => order.userId === user.id);
      setUserOrders(orders);
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
    }
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/login');
  };

  const handleProfileSave = (updatedUser: User) => {
    setCurrentUser(updatedUser); // Update local state
    // Potentially update AuthContext if using one
  };

  if (!currentUser) {
    // This should ideally be handled by a loading state or the redirect itself
    return <SiteLayout><p className="text-center py-10">Loading account...</p></SiteLayout>;
  }

  return (
    <SiteLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">My Account</h1>
        <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="orders"><Package className="mr-2 h-4 w-4 inline-block" />Order History</TabsTrigger>
          <TabsTrigger value="profile"><UserIcon className="mr-2 h-4 w-4 inline-block" />Profile</TabsTrigger>
          <TabsTrigger value="addresses"><MapPin className="mr-2 h-4 w-4 inline-block" />Addresses</TabsTrigger>
          {/* <TabsTrigger value="payment"><CreditCard className="mr-2 h-4 w-4 inline-block" />Payment Methods</TabsTrigger> */}
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              {userOrders.length > 0 ? (
                <ul className="space-y-4">
                  {userOrders.map(order => (
                    <li key={order.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Order ID: {order.id}</p>
                          <p className="text-sm text-muted-foreground">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">Total: ${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                           <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.status}
                          </span>
                          <Link href={`/account/orders/${order.id}`} legacyBehavior>
                            <a className="mt-2 block text-sm text-primary hover:underline">View Details</a>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You have no past orders.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfileForm user={currentUser} onSave={handleProfileSave} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
            <Card>
                <CardHeader>
                <CardTitle>Manage Addresses</CardTitle>
                <CardDescription>Update your shipping and billing addresses.</CardDescription>
                </CardHeader>
                <CardContent>
                <AddressManager 
                    addresses={currentUser.addresses || []} 
                    onSaveAddress={(addr) => console.log("Save address", addr)} // Placeholder
                    onDeleteAddress={(id) => console.log("Delete address", id)} // Placeholder
                />
                </CardContent>
            </Card>
        </TabsContent>
        
        {/* <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Payment methods management coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </SiteLayout>
  );
}
