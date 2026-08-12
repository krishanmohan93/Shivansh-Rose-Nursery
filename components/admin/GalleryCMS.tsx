'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderKanban, Plus, Trash2, Search, Filter, CheckCircle2, MapPin, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GALLERY_ITEMS, GalleryItem } from '@/components/home/GallerySection';

export const GalleryCMS: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('plants');
  const [newLocation, setNewLocation] = useState('Shivansh Rose Nursery, Wakad');
  const [newImage, setNewImage] = useState('/images/plants/peace lily.jpg');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: GalleryItem = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel: newCategory.toUpperCase(),
      location: newLocation.trim() || 'Wakad Branch Store',
      image: newImage.trim() || '/images/plants/peace lily.jpg',
      heightClass: 'h-80',
    };

    setItems((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
    setNewTitle('');
    showToast('New photo uploaded to gallery!');
  };

  const handleDeletePhoto = (id: number) => {
    if (confirm('Remove this photo from gallery?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast('Photo removed from gallery!');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-900 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-emerald-600" /> Photo Gallery CMS
          </h2>
          <p className="text-xs text-slate-500">
            Upload, manage, and filter showcase photos displayed in the website Pinterest masonry gallery.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Upload Photo
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photos by title or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'plants', 'pots', 'garden', 'store', 'customers', 'landscape'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-emerald-100 shadow-soft overflow-hidden group relative space-y-2 p-3"
          >
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <button
                onClick={() => handleDeletePhoto(item.id)}
                className="absolute top-2 right-2 p-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-1 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                {item.category}
              </span>
              <h4 className="font-display font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{item.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Upload Photo to Gallery
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Photo Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Society Garden Landscape Setup"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Category Tag</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="plants">Plants</option>
                    <option value="pots">Pots &amp; Planters</option>
                    <option value="garden">Garden Services</option>
                    <option value="store">Nursery Store</option>
                    <option value="customers">Happy Customers</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Location Tag</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Shivansh Rose Nursery, Wakad"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Image Path / URL</label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md">
                    Upload Photo
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
