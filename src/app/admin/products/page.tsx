
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
  DialogClose
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/LanguageContext';

const ProductForm = ({ product, onSave, onCancel }: { product?: Product | null, onSave: (productData: Omit<Product, 'id'> | Product) => void, onCancel: () => void }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || '');
  const [stock, setStock] = useState(product?.stock || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || 'https://placehold.co/600x400.png');
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || !category || stock < 0) {
        toast({ title: t('admin.validationErrorToastTitle'), description: t('admin.validationErrorToastDescription'), variant: "destructive"});
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
        <div><Label htmlFor="name">{t('admin.productFormProductNameLabel')}</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div><Label htmlFor="description">{t('admin.productFormDescriptionLabel')}</Label><Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} /></div>
        <div><Label htmlFor="price">{t('admin.productFormPriceLabel')}</Label><Input id="price" type="number" step="0.01" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required /></div>
        <div><Label htmlFor="category">{t('admin.productFormCategoryLabel')}</Label><Input id="category" value={category} onChange={e => setCategory(e.target.value)} required /></div>
        <div><Label htmlFor="stock">{t('admin.productFormStockLabel')}</Label><Input id="stock" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value))} required /></div>
        <div><Label htmlFor="imageUrl">{t('admin.productFormImageUrlLabel')}</Label><Input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} /></div>
        <DialogFooter className="pt-4">
            <DialogClose asChild><Button type="button" variant="outline" onClick={onCancel}>{t('admin.productFormCancelButton')}</Button></DialogClose>
            <Button type="submit">{t('admin.productFormSaveButton')}</Button>
        </DialogFooter>
    </form>
  )
}

const ProductSearch = ({
    searchTerm,
    setSearchTerm,
    handleSearchSubmit,
    t
}: {
    searchTerm: string,
    setSearchTerm: (value: string) => void,
    handleSearchSubmit: (e: React.FormEvent) => void,
    t: (key: string) => string
}) => (
    <form onSubmit={handleSearchSubmit} className="relative mt-4 flex gap-2 md:w-1/2">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder={t('admin.searchProductsPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
            />
        </div>
        <Button type="submit">{t('admin.searchButton')}</Button>
    </form>
);


export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(appliedSearchTerm.toLowerCase())
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
    if (window.confirm(t('admin.confirmDeleteProduct'))) { 
        setProducts(prev => prev.filter(p => p.id !== productId));
        toast({ title: t('admin.productDeletedToastTitle'), description: t('admin.productDeletedToastDescription')});
    }
  }

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) { 
        setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
        toast({ title: t('admin.productUpdatedToastTitle'), description: t('admin.productUpdatedToastDescription', {productName: t(productData.name)})});
    } else { 
        const newProduct = { ...productData, id: `prod-${Date.now()}` }; 
        setProducts(prev => [newProduct, ...prev]);
        toast({ title: t('admin.productAddedToastTitle'), description: t('admin.productAddedToastDescription', {productName: t(newProduct.name)})});
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('admin.manageProductsTitle')}</h1>
        <Button onClick={handleAddProduct}><PlusCircle className="mr-2 h-5 w-5" /> {t('admin.addProductButton')}</Button>
      </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{editingProduct ? t('admin.editProductModalTitle') : t('admin.addProductModalTitle')}</DialogTitle>
                    <DialogDescription>
                        {editingProduct ? t('admin.editProductModalDescription', {productName: t(editingProduct.name)}) : t('admin.addProductModalDescription')}
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
          <CardTitle>{t('admin.productListCardTitle')}</CardTitle>
          <CardDescription>{t('admin.productListCardDescription')}</CardDescription>
          <ProductSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchSubmit={handleSearchSubmit}
            t={t}
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">{t('admin.imageColumn')}</TableHead>
                <TableHead>{t('admin.nameColumn')}</TableHead>
                <TableHead>{t('admin.categoryColumn')}</TableHead>
                <TableHead className="text-right">{t('admin.priceColumn')}</TableHead>
                <TableHead className="text-right">{t('admin.stockColumn')}</TableHead>
                <TableHead className="text-center w-[120px]">{t('admin.actionsColumn')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image src={product.imageUrl} alt={product.name} width={50} height={50} className="rounded-md object-cover" data-ai-hint={product.dataAiHint || "product image"}/>
                  </TableCell>
                  <TableCell className="font-medium">{t(product.name)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.price.toFixed(2)} MDL</TableCell>
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
                    <TableCell colSpan={6} className="text-center h-24">{t('admin.noProductsFoundAdmin')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
