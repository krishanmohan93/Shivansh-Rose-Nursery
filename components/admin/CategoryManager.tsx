'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Trash2, Edit2, CheckCircle2, Save, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CATEGORY_STRUCTURE, CategoryGroup, CategoryItem } from '@/lib/data/categories';

export const CategoryManager: React.FC = () => {
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>(CATEGORY_STRUCTURE);
  const [newSubcatName, setNewSubcatName] = useState('');
  const [newSubcatSlug, setNewSubcatSlug] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('plants');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubcatName.trim()) return;

    const newItem: CategoryItem = {
      name: newSubcatName.trim(),
      slug: newSubcatSlug.trim() || newSubcatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: '🌿',
      path: `/products/${selectedGroupId}/${newSubcatSlug || newSubcatName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: 'Nursery category collection.',
    };

    setCategoryGroups((prev) =>
      prev.map((group) =>
        group.groupSlug === selectedGroupId
          ? { ...group, items: [...group.items, newItem] }
          : group
      )
    );

    setNewSubcatName('');
    setNewSubcatSlug('');
    showToast('Subcategory added successfully!');
  };

  const handleDeleteSubcategory = (groupId: string, slug: string) => {
    if (confirm('Delete this subcategory?')) {
      setCategoryGroups((prev) =>
        prev.map((group) =>
          group.groupSlug === groupId
            ? { ...group, items: group.items.filter((item) => item.slug !== slug) }
            : group
        )
      );
      showToast('Subcategory deleted!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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
            <Layers className="w-6 h-6 text-emerald-600" /> Category Tree Manager
          </h2>
          <p className="text-xs text-slate-500">
            Manage product categories and subcategories displayed across navigation menus and filters.
          </p>
        </div>
      </div>

      {/* Add New Subcategory Form */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-600" /> Add New Subcategory
        </h3>

        <form onSubmit={handleAddSubcategory} className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs sm:text-sm">
          <div className="sm:col-span-4 space-y-1">
            <label className="font-semibold text-slate-700">Target Category Group</label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
            >
              <option value="plants">Plants</option>
              <option value="pots">Pots &amp; Planters</option>
              <option value="other">Other Products</option>
            </select>
          </div>

          <div className="sm:col-span-4 space-y-1">
            <label className="font-semibold text-slate-700">Subcategory Name</label>
            <input
              type="text"
              required
              value={newSubcatName}
              onChange={(e) => setNewSubcatName(e.target.value)}
              placeholder="e.g. Rare Succulents or Hanging Planters"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="sm:col-span-4 space-y-1 flex items-end">
            <Button type="submit" variant="primary" size="md" className="w-full shadow-md" icon={<Plus className="w-4 h-4" />}>
              Add Subcategory
            </Button>
          </div>
        </form>
      </div>

      {/* Categories Tree Display */}
      <div className="space-y-6">
        {categoryGroups.map((group) => (
          <div key={group.groupSlug} className="bg-white rounded-3xl border border-emerald-100 shadow-soft p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-display font-bold text-xl text-slate-900">{group.groupName}</h4>
                <p className="text-xs text-slate-500">{group.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {group.items.length} Subcategories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {group.items.map((item) => (
                <div
                  key={item.slug}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 text-sm block">
                      {item.icon} {item.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      {item.path}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteSubcategory(group.groupSlug, item.slug)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors shrink-0"
                    title="Delete subcategory"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
