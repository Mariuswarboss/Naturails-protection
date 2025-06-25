
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockOrders, mockUsers } from '@/lib/data'; 
import type { Order, User, Address as AddressType } from '@/types';
import Link from 'next/link';
import { Package, MapPin, User as UserIcon, CreditCard, LogOut, Edit3, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/LanguageContext';

const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    if (token && email) {
      const user = mockUsers.find(u => u.email === email);
      if (user) return { ...user, name: name || user.name }; 
      return { id: 'new-user', email, name: name || 'New User', addresses: [] };
    }
  }
  return null;
};

const UserProfileForm = ({ user, onSave }: { user: User, onSave: (updatedUser: User) => void }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    onSave(updatedUser); 
    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
    }
    toast({ title: t('accountPage.profileUpdatedToastTitle'), description: t('accountPage.profileUpdatedToastDescription') });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="profile-name">{t('accountPage.fullNameLabel')}</Label>
        <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="profile-email">{t('accountPage.emailLabel')}</Label>
        <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button type="submit">{t('accountPage.saveChangesButton')}</Button>
    </form>
  );
};

const AddressManager = ({ addresses, onSaveAddress, onDeleteAddress }: { addresses: AddressType[], onSaveAddress: (address: AddressType) => void, onDeleteAddress: (addressId: string) => void }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{t('accountPage.yourAddressesTitle')}</h3>
      {addresses && addresses.length > 0 ? (
        <ul className="space-y-2">
          {addresses.map(addr => (
            <li key={addr.id} className="p-3 border rounded-md bg-muted/50">
              <p>{addr.street}, {addr.city}, {addr.postalCode}</p>
              <p>{addr.country} {addr.isDefault && <span className="text-xs text-primary ml-2">{t('accountPage.defaultAddressSuffix')}</span>}</p>
            </li>
          ))}
        </ul>
      ) : <p>{t('accountPage.noAddressesSaved')}</p>}
      <Button variant="outline" className="mt-4">{t('accountPage.addNewAddressButton')}</Button>
    </div>
  );
};


export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
    } else {
      setCurrentUser(user);
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
    toast({ title: t('accountPage.loggedOutToastTitle'), description: t('accountPage.loggedOutToastDescription') });
    router.push('/login');
  };

  const handleProfileSave = (updatedUser: User) => {
    setCurrentUser(updatedUser); 
  };

  if (!currentUser) {
    return (
        <SiteLayout>
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">{t('loading.text')}</p>
            </div>
        </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('accountPage.myAccountTitle')}</h1>
        <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> {t('accountPage.logoutButton')}</Button>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6"> {/* Adjusted grid-cols */}
          <TabsTrigger value="orders"><Package className="mr-2 h-4 w-4 inline-block" />{t('accountPage.orderHistoryTab')}</TabsTrigger>
          <TabsTrigger value="profile"><UserIcon className="mr-2 h-4 w-4 inline-block" />{t('accountPage.profileTab')}</TabsTrigger>
          <TabsTrigger value="addresses"><MapPin className="mr-2 h-4 w-4 inline-block" />{t('accountPage.addressesTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>{t('accountPage.orderHistoryCardTitle')}</CardTitle>
              <CardDescription>{t('accountPage.orderHistoryCardDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {userOrders.length > 0 ? (
                <ul className="space-y-4">
                  {userOrders.map(order => (
                    <li key={order.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{t('accountPage.orderIdLabel', { orderId: order.id })}</p>
                          <p className="text-sm text-muted-foreground">{t('accountPage.dateLabel', { date: new Date(order.orderDate).toLocaleDateString() })}</p>
                          <p className="text-sm text-muted-foreground">{t('accountPage.totalLabel', { total: order.totalAmount.toFixed(2) })}</p>
                        </div>
                        <div className="text-right">
                           <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.status} {/* Order status not translated as it's data */}
                          </span>
                          <Link href={`/account/orders/${order.id}`} className="mt-2 block text-sm text-primary hover:underline">
                            {t('accountPage.viewDetailsLink')}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t('accountPage.noPastOrders')}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t('accountPage.editProfileCardTitle')}</CardTitle>
              <CardDescription>{t('accountPage.editProfileCardDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfileForm user={currentUser} onSave={handleProfileSave} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
            <Card>
                <CardHeader>
                <CardTitle>{t('accountPage.manageAddressesCardTitle')}</CardTitle>
                <CardDescription>{t('accountPage.manageAddressesCardDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                <AddressManager 
                    addresses={currentUser.addresses || []} 
                    onSaveAddress={(addr) => console.log("Save address", addr)} 
                    onDeleteAddress={(id) => console.log("Delete address", id)} 
                />
                </CardContent>
            </Card>
        </TabsContent>
        
      </Tabs>
    </SiteLayout>
  );
}
