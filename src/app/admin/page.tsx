import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";

// Mock data for dashboard
const stats = [
  { title: "Total Revenue", value: "$12,345", icon: DollarSign, change: "+5.2%" },
  { title: "Total Orders", value: "230", icon: ShoppingCart, change: "+10" },
  { title: "Total Products", value: "6", icon: Package, change: "+1" },
  { title: "Active Users", value: "150", icon: Users, change: "-2" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent orders list */}
            <p className="text-muted-foreground">Recent orders will be displayed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for quick actions */}
            <p className="text-muted-foreground">Quick actions for admin tasks.</p>
            {/* Example: <Button>Add New Product</Button> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
