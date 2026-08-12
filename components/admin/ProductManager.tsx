'use client';

import React, { useState } from 'react';
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
import { PRODUCTS, Product } from '@/lib/data/products';
import { CATEGORY_STRUCTURE } from '@/lib/data/categories';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<'all' | 'published' | 'hidden'>('all');

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

  const handleAddImage = () => {
    if (formImageInput.trim()) {
      setFormImages((prev) => [...prev, formImageInput.trim()]);
      setFormImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleVisibility = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p))
    );
    showToast('Product visibility updated!');
  };

  const handleToggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    showToast('Featured status updated!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product deleted successfully!');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const sizesArray = formSizes.split(',').map((s) => s.trim()).filter(Boolean);
    const colorsArray = formColors.split(',').map((c) => c.trim()).filter(Boolean);

    if (editingProduct) {
      // Edit existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName.trim(),
                category: formCategory,
                subcategory: formSubcategory,
                shortDescription: formShortDesc.trim(),
                fullDescription: formFullDesc.trim(),
                images: formImages.length > 0 ? formImages : ['/images/plants/peace lily.jpg'],
                image: formImages[0] || '/images/plants/peace lily.jpg',
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
              }
            : p
        )
      );
      showToast('Product updated successfully!');
    } else {
      // Add new
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formName.trim(),
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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

      setProducts((prev) => [newProduct, ...prev]);
      showToast('New product added successfully!');
    }

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
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Product Images</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formImageInput}
                      onChange={(e) => setFormImageInput(e.target.value)}
                      placeholder="Paste Image URL (or /images/plants/...)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs"
                    />
                    <Button type="button" size="sm" variant="secondary" onClick={handleAddImage}>
                      Add
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto pt-2">
                    {formImages.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                        <Image src={img} alt="Product image preview" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
