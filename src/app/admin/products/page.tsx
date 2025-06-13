"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockProducts } from "@/lib/data";
import type { Product } from "@/types";
import Image from "next/image";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


const ProductForm = ({ product, onSave, onCancel }: { product?: Product | null, onSave: (productData: Omit<Product, 'id'> | Product) => void, onCancel: () => void }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || '');
  const [stock, setStock] = useState(product?.stock || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || 'https://placehold.co/600x400.png');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || !category || stock < 0) {
        toast({ title: "Validation Error", description: "Please fill all required fields correctly.", variant: "destructive"});
        return;
    }
    const productData = { name, description, price, category, stock, imageUrl };
    if (product && product.id) {
        onSave({ id: product.id, ...productData });
    } else {
        onSave(productData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
        <div><Label htmlFor="name">Product Name</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div><Label htmlFor="description">Description</Label><Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} /></div>
        <div><Label htmlFor="price">Price</Label><Input id="price" type="number" step="0.01" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required /></div>
        <div><Label htmlFor="category">Category</Label><Input id="category" value={category} onChange={e => setCategory(e.target.value)} required /></div>
        <div><Label htmlFor="stock">Stock</Label><Input id="stock" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value))} required /></div>
        <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} /></div>
        <DialogFooter className="pt-4">
            <DialogClose asChild><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button></DialogClose>
            <Button type="submit">Save Product</Button>
        </DialogFooter>
    </form>
  )
}


export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch products from an API
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  const handleDeleteProduct = (productId: string) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this product?")) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        toast({ title: "Product Deleted", description: "The product has been removed."});
    }
  }

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) { // Editing existing product
        setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
        toast({ title: "Product Updated", description: `${productData.name} has been updated.`});
    } else { // Adding new product
        const newProduct = { ...productData, id: `prod-${Date.now()}` }; // Mock ID generation
        setProducts(prev => [newProduct, ...prev]);
        toast({ title: "Product Added", description: `${newProduct.name} has been added.`});
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={handleAddProduct}><PlusCircle className="mr-2 h-5 w-5" /> Add Product</Button>
      </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {editingProduct ? `Update details for ${editingProduct.name}.` : 'Fill in the details for the new product.'}
                    </DialogDescription>
                </DialogHeader>
                <ProductForm 
                    product={editingProduct} 
                    onSave={handleSaveProduct}
                    onCancel={() => { setIsModalOpen(false); setEditingProduct(null); }}
                />
            </DialogContent>
        </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>View, edit, or delete products.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-1/3"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-center w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image src={product.imageUrl} alt={product.name} width={50} height={50} className="rounded-md object-cover" data-ai-hint={product.dataAiHint || "product image"}/>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="mr-1 hover:text-primary" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No products found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
