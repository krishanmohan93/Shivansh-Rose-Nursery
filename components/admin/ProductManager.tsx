'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  X,
  Upload,
  Filter,
  Sparkles,
  Package,
  Layers,
  Info,
  Sun,
  Droplets,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PRODUCTS, Product, getAdminProducts, mapAdminProductToDbProduct } from '@/lib/data/products';
import {
  getStoredProducts,
  deleteStoredProduct,
  saveStoredProduct,
  toggleStoredProductVisibility,
  toggleStoredProductFeatured,
  PRODUCTS_UPDATED_EVENT,
} from '@/lib/store/productsStore';
import { CATEGORY_STRUCTURE } from '@/lib/data/categories';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<'all' | 'published' | 'hidden'>('all');

  // Load persistent products on mount and listen to store updates
  useEffect(() => {
    setProducts(getAdminProducts());

    const handleStoreUpdate = () => {
      setProducts(getAdminProducts());
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleStoreUpdate);
    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleStoreUpdate);
    };
  }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('plants');
  const [formSubcategory, setFormSubcategory] = useState('indoor');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formImages, setFormImages] = useState<string[]>(['/images/plants/peace lily.jpg']);
  const [formImageInput, setFormImageInput] = useState('');
  const [formSizes, setFormSizes] = useState<string>('Small, Medium, Large');
  const [formColors, setFormColors] = useState<string>('');
  const [formCareSunlight, setFormCareSunlight] = useState('Bright Indirect Sunlight');
  const [formCareWatering, setFormCareWatering] = useState('Water 1-2 times per week');
  const [formCareSoil, setFormCareSoil] = useState('Well-draining coco-peat & vermicompost mix');
  const [formPotMaterial, setFormPotMaterial] = useState('Ceramic');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsHidden, setFormIsHidden] = useState(false);
  const [formIsInStock, setFormIsInStock] = useState(true);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('plants');
    setFormSubcategory('indoor');
    setFormShortDesc('');
    setFormFullDesc('');
    setFormImages(['/images/plants/peace lily.jpg']);
    setFormImageInput('');
    setFormSizes('Small, Medium, Large');
    setFormColors('');
    setFormCareSunlight('Bright Indirect Sunlight');
    setFormCareWatering('Water 1-2 times per week');
    setFormCareSoil('Well-draining coco-peat & vermicompost mix');
    setFormPotMaterial('Ceramic');
    setFormIsFeatured(false);
    setFormIsHidden(false);
    setFormIsInStock(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormSubcategory(product.subcategory);
    setFormShortDesc(product.shortDescription);
    setFormFullDesc(product.fullDescription);
    setFormImages(product.images && product.images.length > 0 ? product.images : [product.image]);
    setFormImageInput('');
    setFormSizes(product.availableSizes ? product.availableSizes.join(', ') : 'Medium');
    setFormColors(product.availableColors ? product.availableColors.join(', ') : '');
    setFormCareSunlight(product.careInformation?.sunlight || '');
    setFormCareWatering(product.careInformation?.watering || '');
    setFormCareSoil(product.careInformation?.soilMix || '');
    setFormPotMaterial(product.potMaterial || 'Ceramic');
    setFormIsFeatured(!!product.isFeatured);
    setFormIsHidden(!!product.isHidden);
    setFormIsInStock(product.availabilityStatus !== 'Out of Stock');
    setIsModalOpen(true);
  };

  // Hidden file input ref and upload loading state
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTriggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    showToast('Processing photo...');

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Try uploading to Cloudinary via backend API if available
      try {
        const res = await fetch('/api/cloudinary/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder: 'shivansh-rose-nursery/products' }),
        });

        if (res.ok) {
          const signData = await res.json();
          const cloudFormData = new FormData();
          cloudFormData.append('file', file);
          cloudFormData.append('api_key', signData.apiKey);
          cloudFormData.append('timestamp', signData.timestamp.toString());
          cloudFormData.append('signature', signData.signature);
          cloudFormData.append('folder', signData.folder);

          const cloudRes = await fetch(
            `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
            { method: 'POST', body: cloudFormData }
          );

          if (cloudRes.ok) {
            const cloudResult = await cloudRes.json();
            if (cloudResult.secure_url) {
              uploadedUrls.push(cloudResult.secure_url);
              continue;
            }
          }
        }
      } catch (err) {
        console.warn('Cloudinary upload fallback to client Data URL:', err);
      }

      // Fallback: Read file as compressed canvas Data URL
      try {
        const dataUrl = await compressImageFile(file);
        uploadedUrls.push(dataUrl);
      } catch (err) {
        console.error('Failed to convert image file:', err);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormImages((prev) => [...prev, ...uploadedUrls]);
      showToast(`${uploadedUrls.length} photo(s) added successfully!`);
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Canvas image compression helper to resize high-res device photos
  function compressImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  const handleAddImage = () => {
    if (formImageInput.trim()) {
      setFormImages((prev) => [...prev, formImageInput.trim()]);
      setFormImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleVisibility = async (id: string) => {
    await toggleStoredProductVisibility(id);
    setProducts(getAdminProducts());
    showToast('Product visibility updated!');
  };

  const handleToggleFeatured = async (id: string) => {
    await toggleStoredProductFeatured(id);
    setProducts(getAdminProducts());
    showToast('Featured status updated!');
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteStoredProduct(id);
      setProducts(getAdminProducts());
      showToast('Product deleted successfully!');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const sizesArray = formSizes.split(',').map((s) => s.trim()).filter(Boolean);
    const colorsArray = formColors.split(',').map((c) => c.trim()).filter(Boolean);

    const adminProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName.trim(),
      slug: editingProduct ? editingProduct.slug : formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: formCategory,
      subcategory: formSubcategory,
      image: formImages[0] || '/images/plants/peace lily.jpg',
      images: formImages.length > 0 ? formImages : ['/images/plants/peace lily.jpg'],
      shortDescription: formShortDesc.trim() || 'Fresh nursery plant variety.',
      fullDescription: formFullDesc.trim() || 'Sourced directly from our nursery garden in Pune.',
      availableSizes: sizesArray,
      availableColors: colorsArray,
      careInformation: {
        sunlight: formCareSunlight,
        watering: formCareWatering,
        soilMix: formCareSoil,
      },
      potMaterial: formPotMaterial,
      isFeatured: formIsFeatured,
      isHidden: formIsHidden,
      availabilityStatus: formIsInStock ? 'In Stock' : 'Out of Stock',
      badge: formIsFeatured ? 'Featured' : undefined,
    };

    const existingDb = getStoredProducts().find((p) => p.id === adminProd.id);
    const dbProd = mapAdminProductToDbProduct(adminProd, existingDb);

    await saveStoredProduct(dbProd);
    setProducts(getAdminProducts());

    showToast(editingProduct ? 'Product updated successfully!' : 'New product added successfully!');
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesVis =
      selectedVisibility === 'all' ||
      (selectedVisibility === 'published' && !p.isHidden) ||
      (selectedVisibility === 'hidden' && p.isHidden);

    return matchesSearch && matchesCat && matchesVis;
  });

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-900 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-600" /> Product Manager
          </h2>
          <p className="text-xs text-slate-500">
            Add, edit, hide/unhide, or delete products across plants and pot categories.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={handleOpenAddModal}
          icon={<Plus className="w-4 h-4" />}
          className="shadow-md"
        >
          Add New Product
        </Button>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories ({products.length})
          </button>
          <button
            onClick={() => setSelectedCategory('plants')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'plants'
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Plants
          </button>
          <button
            onClick={() => setSelectedCategory('pots')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'pots'
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pots &amp; Planters
          </button>
          <button
            onClick={() => setSelectedCategory('seasonal-special')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'seasonal-special'
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Water Fountains &amp; Special
          </button>
        </div>
      </div>

      {/* Products Table View */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Sizes</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-body">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No products found matching your search query.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block leading-tight">
                          {product.name}
                        </span>
                        <span className="text-[11px] text-slate-500 capitalize">
                          {product.subcategory}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700 capitalize">
                      {product.category}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      {product.availableSizes ? product.availableSizes.join(', ') : 'Standard'}
                    </td>

                    <td className="py-3.5 px-4">
                      {product.isHidden ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 inline-flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> Hidden
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          product.isFeatured
                            ? 'bg-amber-50 text-amber-600 border-amber-300'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleVisibility(product.id)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Toggle Visibility"
                        >
                          {product.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900">
                    {editingProduct ? 'Edit Product Details' : 'Add New Product'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update product photos, care info, sizes, and category assignments.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-5 text-xs sm:text-sm">
                
                {/* Product Name */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Product Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Peace Lily (Spathiphyllum) or Handcrafted Ceramic Pot"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Category & Subcategory Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                    >
                      <option value="plants">Plants</option>
                      <option value="pots">Pots &amp; Planters</option>
                      <option value="seasonal-special">Water Fountains &amp; Special</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Subcategory</label>
                    <input
                      type="text"
                      value={formSubcategory}
                      onChange={(e) => setFormSubcategory(e.target.value)}
                      placeholder="e.g. indoor, outdoor, ceramic, chinese-premium"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                {/* Images Upload & List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700">Product Photos</label>
                    <span className="text-xs text-slate-500">Select photos from device or enter URL</span>
                  </div>

                  {/* Hidden Device File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Primary Browse Photo Action Card */}
                  <button
                    type="button"
                    onClick={handleTriggerFileSelect}
                    disabled={isUploading}
                    className="w-full p-4 rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/60 hover:bg-emerald-100/60 transition-all flex items-center justify-center gap-3 text-emerald-800 font-bold text-xs sm:text-sm group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span>{isUploading ? 'Processing & Uploading Photo...' : 'Browse Photo from Device'}</span>
                  </button>

                  {/* Secondary Manual URL Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={formImageInput}
                      onChange={(e) => setFormImageInput(e.target.value)}
                      placeholder="Or paste image URL (https://...)"
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs"
                    />
                    <Button type="button" size="sm" variant="secondary" onClick={handleAddImage}>
                      Add URL
                    </Button>
                  </div>

                  {/* Selected Photos Thumbnails List */}
                  <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-1">
                    {formImages.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group shadow-xs">
                        <Image src={img} alt="Product image preview" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Short Description</label>
                  <input
                    type="text"
                    value={formShortDesc}
                    onChange={(e) => setFormShortDesc(e.target.value)}
                    placeholder="Short summary for preview cards..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={formFullDesc}
                    onChange={(e) => setFormFullDesc(e.target.value)}
                    placeholder="Complete description of plant origins, pot features, and decor recommendations..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>

                {/* Sizes & Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Available Sizes (Comma Separated)</label>
                    <input
                      type="text"
                      value={formSizes}
                      onChange={(e) => setFormSizes(e.target.value)}
                      placeholder="Small, Medium, Large, Extra Large"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Pot Material / Colors</label>
                    <input
                      type="text"
                      value={formPotMaterial}
                      onChange={(e) => setFormPotMaterial(e.target.value)}
                      placeholder="Ceramic, Fiber, Soil Matka, White, Terracotta"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                {/* Plant Care Details (For Plants) */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                  <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-emerald-600" /> Plant Care Information (For Plants Only)
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-medium text-slate-700 block">Sunlight Need</label>
                      <input
                        type="text"
                        value={formCareSunlight}
                        onChange={(e) => setFormCareSunlight(e.target.value)}
                        placeholder="e.g. Bright Indirect Sunlight"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-slate-700 block">Watering Schedule</label>
                      <input
                        type="text"
                        value={formCareWatering}
                        onChange={(e) => setFormCareWatering(e.target.value)}
                        placeholder="e.g. Water 1-2 times per week"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles: Featured & Hidden & Stock */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span>Feature on Home Page</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formIsHidden}
                      onChange={(e) => setFormIsHidden(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>Hide Product from Public Website</span>
                  </label>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md">
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </Button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
