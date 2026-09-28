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
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Product as DbProduct } from '@/types/database';

export interface CategoryOption {
  id: string;
  name: string;
  parentGroup: string;
}

const CATEGORY_TAXONOMY = [
  { group: 'Plants', subcategories: [
    { id: 'cat-indoor', name: 'Indoor Plants' },
    { id: 'cat-outdoor', name: 'Outdoor Plants' },
  ]},
  { group: 'Pots & Planters', subcategories: [
    { id: 'cat-pots-ceramic', name: 'Ceramic Pots' },
    { id: 'cat-pots-chinese-premium', name: 'Chinese Premium Pots' },
    { id: 'cat-pots-plastic', name: 'Plastic Pots' },
    { id: 'cat-pots-fiber', name: 'Fiber Pots' },
    { id: 'cat-pots-soil-mitti', name: 'Soil (Mitti) Pots' },
  ]},
  { group: 'Other Products & Decor', subcategories: [
    { id: 'cat-other-fountains', name: 'Water Fountains' },
    { id: 'cat-other-diwali', name: 'Diwali Decoration' },
    { id: 'cat-other-ganpati', name: 'Ganpati Murti' },
  ]},
];

/**
 * ProductManager component.
 * Complete production-ready admin manager for Products, fully connected to Supabase Database & Cloudinary CDN.
 *
 * @returns {React.ReactElement} Rendered ProductManager component.
 */
export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<'all' | 'published' | 'hidden'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formMainGroup, setFormMainGroup] = useState('Pots & Planters');
  const [formCategoryId, setFormCategoryId] = useState('cat-pots-ceramic');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSunlight, setFormSunlight] = useState('Bright Indirect Light');
  const [formWater, setFormWater] = useState('Water Weekly');
  const [formAvailability, setFormAvailability] = useState<'In Stock' | 'Limited Stock' | 'Out of Stock'>('In Stock');
  const [formSizesInput, setFormSizesInput] = useState('Small (10 inch), Medium (1.5 ft), Large (2.5 ft)');
  const [formColorsInput, setFormColorsInput] = useState('White, Pastel Green, Terracotta');
  const [formCloudinaryUrl, setFormCloudinaryUrl] = useState('');
  const [formCloudinaryPublicId, setFormCloudinaryPublicId] = useState('');
  const [formIsPublished, setFormIsPublished] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Uploading & Action Processing States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Fetch Products from Supabase API
  const fetchProductsFromSupabase = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const res = await fetch('/api/products?limit=200');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch products');
      }
    } catch (err: any) {
      console.error('Error loading products from Supabase:', err);
      setActionError('Could not load products from Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromSupabase();
  }, []);

  // Show temporary toast notification
  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Open Form Modal for Create or Edit
  const openModal = (productToEdit?: DbProduct) => {
    setActionError(null);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setFormName(productToEdit.name);
      setFormCategoryId(productToEdit.category_id);
      
      // Determine Main Group
      if (productToEdit.category_id.includes('indoor') || productToEdit.category_id.includes('outdoor')) {
        setFormMainGroup('Plants');
      } else if (productToEdit.category_id.includes('pot') || productToEdit.category_id.includes('ceramic') || productToEdit.category_id.includes('fiber')) {
        setFormMainGroup('Pots & Planters');
      } else {
        setFormMainGroup('Other Products & Decor');
      }

      setFormShortDesc(productToEdit.short_description || '');
      setFormDesc(productToEdit.description || '');
      setFormSunlight(productToEdit.sunlight || 'Bright Indirect Light');
      setFormWater(productToEdit.water || 'Water Weekly');
      setFormAvailability(productToEdit.availability_status || 'In Stock');
      setFormSizesInput(Array.isArray(productToEdit.sizes) ? productToEdit.sizes.join(', ') : 'Standard');
      setFormColorsInput(Array.isArray(productToEdit.colors) ? productToEdit.colors.join(', ') : 'Default');
      setFormCloudinaryUrl(productToEdit.cloudinary_url || '');
      setFormCloudinaryPublicId(productToEdit.cloudinary_public_id || '');
      setFormIsPublished(productToEdit.is_published !== false);
      setFormIsFeatured(!!productToEdit.is_featured);
    } else {
      setEditingProduct(null);
      setFormName('');
      setFormMainGroup('Pots & Planters');
      setFormCategoryId('cat-pots-ceramic');
      setFormShortDesc('');
      setFormDesc('');
      setFormSunlight('Bright Indirect Light');
      setFormWater('Water Weekly');
      setFormAvailability('In Stock');
      setFormSizesInput('Small (10 inch), Medium (1.5 ft), Large (2.5 ft)');
      setFormColorsInput('White, Pastel Green, Terracotta');
      setFormCloudinaryUrl('/images/plants/peace lily.jpg');
      setFormCloudinaryPublicId('');
      setFormIsPublished(true);
      setFormIsFeatured(false);
    }
    setIsModalOpen(true);
  };

  // Handle Cloudinary Image File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setActionError('File size exceeds 10MB. Please select a smaller image.');
      return;
    }

    setUploadingImage(true);
    setActionError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        const res = await fetch('/api/cloudinary/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image, folder: 'shivansh-rose-nursery/products' }),
        });

        const data = await res.json();
        if (data.success && data.secure_url) {
          setFormCloudinaryUrl(data.secure_url);
          setFormCloudinaryPublicId(data.public_id || '');
          triggerToast('Cloudinary image uploaded successfully!');
        } else {
          throw new Error(data.error || 'Failed to upload image to Cloudinary');
        }
        setUploadingImage(false);
      };
    } catch (err: any) {
      console.error('Upload Error:', err);
      setActionError(err.message || 'Image upload failed. Please try again.');
      setUploadingImage(false);
    }
  };

  // Handle Save (Create or Update in Supabase)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setActionError('Product Name is required.');
      return;
    }

    setSubmittingForm(true);
    setActionError(null);

    const sizesArr = formSizesInput.split(',').map((s) => s.trim()).filter(Boolean);
    const colorsArr = formColorsInput.split(',').map((c) => c.trim()).filter(Boolean);

    const payload = {
      name: formName.trim(),
      category_id: formCategoryId,
      short_description: formShortDesc.trim() || formName.trim(),
      description: formDesc.trim() || formShortDesc.trim() || formName.trim(),
      sunlight: formSunlight,
      water: formWater,
      availability_status: formAvailability,
      sizes: sizesArr,
      colors: colorsArr,
      cloudinary_url: formCloudinaryUrl || '/images/plants/peace lily.jpg',
      cloudinary_public_id: formCloudinaryPublicId || null,
      is_published: formIsPublished,
      is_featured: formIsFeatured,
    };

    try {
      let res;
      if (editingProduct) {
        // Update existing product
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new product
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.success) {
        triggerToast(
          editingProduct
            ? `Product "${formName}" updated in Supabase!`
            : `New product "${formName}" added to Supabase database!`
        );
        setIsModalOpen(false);
        fetchProductsFromSupabase();
      } else {
        throw new Error(data.error || 'Failed to save product to database');
      }
    } catch (err: any) {
      console.error('Save Product Error:', err);
      setActionError(err.message || 'Could not save product to database.');
    } finally {
      setSubmittingForm(false);
    }
  };

  // Handle Permanent Delete from Supabase
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        triggerToast('Product deleted permanently from Supabase database & customer website!');
        setDeleteConfirmId(null);
        fetchProductsFromSupabase();
      } else {
        throw new Error(data.error || 'Failed to delete product');
      }
    } catch (err: any) {
      console.error('Delete Error:', err);
      setActionError('Failed to delete product from database.');
    }
  };

  // Handle Toggle Visibility (Publish/Hide)
  const handleToggleVisibility = async (product: DbProduct) => {
    const newStatus = !product.is_published;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_published: newStatus } : p))
    );

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(newStatus ? 'Product is now Live on Website' : 'Product Hidden from Website');
      }
    } catch (err) {
      console.error('Toggle visibility error:', err);
    }
  };

  // Handle Toggle Featured Status
  const handleToggleFeatured = async (product: DbProduct) => {
    const newFeatured = !product.is_featured;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_featured: newFeatured } : p))
    );

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: newFeatured, is_popular: newFeatured, show_on_homepage: newFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(newFeatured ? 'Marked as Featured Product' : 'Removed from Featured');
      }
    } catch (err) {
      console.error('Toggle featured error:', err);
    }
  };

  // Filtered Products List
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.short_description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVisibility =
      selectedVisibility === 'all'
        ? true
        : selectedVisibility === 'published'
        ? product.is_published
        : !product.is_published;

    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'plants') {
        matchesCategory = product.category_id.includes('indoor') || product.category_id.includes('outdoor');
      } else if (selectedCategory === 'pots') {
        matchesCategory = product.category_id.includes('pot') || product.category_id.includes('ceramic') || product.category_id.includes('fiber');
      } else if (selectedCategory === 'other') {
        matchesCategory = product.category_id.includes('other') || product.category_id.includes('fountain');
      }
    }

    return matchesSearch && matchesVisibility && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-700 text-white font-bold text-xs shadow-2xl flex items-center gap-3 border border-emerald-500"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Title & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-emerald-100 shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-600" />
            <h2 className="font-display font-bold text-2xl text-slate-900">Product Manager</h2>
          </div>
          <p className="text-xs text-slate-500">
            Real-time Supabase Database &amp; Cloudinary CDN Integration. Live changes reflect instantly across the customer website.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Action Error Alert */}
      {actionError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-medium"
            />
          </div>

          {/* Category Group Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories ({products.length})
            </button>
            <button
              onClick={() => setSelectedCategory('plants')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'plants'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Plants
            </button>
            <button
              onClick={() => setSelectedCategory('pots')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'pots'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pots &amp; Planters
            </button>
            <button
              onClick={() => setSelectedCategory('other')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'other'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Water Fountains &amp; Special
            </button>
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-16 text-center space-y-3">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Loading Live Products from Supabase...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-lg text-slate-800">No Products Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No products match your current search or category filter. Click &quot;Add New Product&quot; to insert one into Supabase.
            </p>
            <button
              onClick={() => openModal()}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              + Add First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category ID</th>
                  <th className="py-4 px-4">Care &amp; Sizes</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Image & Product Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                          <Image
                            src={product.cloudinary_url || '/images/plants/peace lily.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="space-y-0.5 max-w-xs">
                          <span className="font-bold text-slate-900 block truncate">{product.name}</span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {product.short_description || product.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono text-[11px]">
                        {product.category_id}
                      </span>
                    </td>

                    {/* Sizes */}
                    <td className="py-4 px-4 text-slate-600 max-w-xs truncate">
                      {Array.isArray(product.sizes) && product.sizes.length > 0
                        ? product.sizes.join(', ')
                        : 'Standard Size'}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleVisibility(product)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                          product.is_published
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {product.is_published ? '✓ Live' : 'Hidden'}
                      </button>
                    </td>

                    {/* Featured Star */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(product)}
                        className={`p-1.5 rounded-xl transition-colors ${
                          product.is_featured
                            ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                            : 'bg-slate-100 text-slate-400 hover:text-amber-500'
                        }`}
                        title={product.is_featured ? 'Featured Product' : 'Make Featured'}
                      >
                        <Star className={`w-4 h-4 ${product.is_featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Eye */}
                        <button
                          onClick={() => handleToggleVisibility(product)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title={product.is_published ? 'Hide from Website' : 'Publish to Website'}
                        >
                          {product.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT PRODUCT MODAL FORM                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[680px] bg-white rounded-3xl shadow-2xl border border-emerald-100 z-50 flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-emerald-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-emerald-950 flex items-center justify-center font-bold">
                    <Package className="w-5 h-5 text-emerald-950" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {editingProduct ? 'Edit Supabase Product' : 'Add New Supabase Product'}
                    </h3>
                    <p className="text-[11px] text-emerald-300">
                      Fill details below to update the live website product database.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ceramic Matka Planter / Peace Lily Plant"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                  />
                </div>

                {/* Main Category Group & Subcategory Cascading Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Main Category Group *
                    </label>
                    <select
                      value={formMainGroup}
                      onChange={(e) => {
                        const newGroup = e.target.value;
                        setFormMainGroup(newGroup);
                        const match = CATEGORY_TAXONOMY.find((t) => t.group === newGroup);
                        if (match && match.subcategories[0]) {
                          setFormCategoryId(match.subcategories[0].id);
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                    >
                      {CATEGORY_TAXONOMY.map((cat) => (
                        <option key={cat.group} value={cat.group}>
                          {cat.group}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Subcategory Section *
                    </label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                    >
                      {CATEGORY_TAXONOMY.find((t) => t.group === formMainGroup)?.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} ({sub.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cloudinary Image Picker */}
                <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                    Cloudinary Product Image *
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Image Preview Box */}
                    <div className="w-20 h-20 rounded-2xl bg-white border border-emerald-200 overflow-hidden relative shrink-0 flex items-center justify-center">
                      {formCloudinaryUrl ? (
                        <Image
                          src={formCloudinaryUrl}
                          alt="Product Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-emerald-400" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={formCloudinaryUrl}
                        onChange={(e) => setFormCloudinaryUrl(e.target.value)}
                        placeholder="Cloudinary Image URL..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium"
                      />

                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading to Cloudinary...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Upload Image from Device</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Short Description / Key Features
                  </label>
                  <input
                    type="text"
                    value={formShortDesc}
                    onChange={(e) => setFormShortDesc(e.target.value)}
                    placeholder="e.g. Handcrafted porcelain finish planter ideal for living room desks"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                  />
                </div>

                {/* Available Sizes & Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Available Sizes (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formSizesInput}
                      onChange={(e) => setFormSizesInput(e.target.value)}
                      placeholder="Small (1 ft), Medium (2 ft), Bushy"
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Availability Status
                    </label>
                    <select
                      value={formAvailability}
                      onChange={(e) => setFormAvailability(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500/30 focus:outline-none"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Limited Stock">Limited Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Checkbox Options */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsPublished}
                      onChange={(e) => setFormIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Publish Immediately on Live Website</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span>Mark as Featured Product ★</span>
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submittingForm || uploadingImage}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
                  >
                    {submittingForm ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving to Supabase...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingProduct ? 'Update Product' : 'Insert Product'}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL                                                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {deleteConfirmId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-3xl shadow-2xl border border-rose-100 p-6 z-50 space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Delete Product Permanently?
                </h3>
                <p className="text-xs text-slate-500">
                  This action will permanently delete the product from the Supabase database. It will be removed immediately from the live customer website.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(deleteConfirmId)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-md"
                >
                  Yes, Delete Product
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
