'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Edit2, Trash2, Eye, EyeOff, CheckCircle2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PLANT_CARE_TIPS, CareTip } from '@/components/home/PlantCareTipsSection';

export const BlogsCMS: React.FC = () => {
  const [blogs, setBlogs] = useState<CareTip[]>(PLANT_CARE_TIPS);
  const [editingBlog, setEditingBlog] = useState<CareTip | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this blog article?')) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      showToast('Blog article deleted!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setBlogs((prev) =>
      prev.map((b) => (b.id === editingBlog.id ? editingBlog : b))
    );
    setEditingBlog(null);
    showToast('Blog saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
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
            <FileText className="w-6 h-6 text-emerald-600" /> Blogs &amp; Plant Care Guides CMS
          </h2>
          <p className="text-xs text-slate-500">
            Publish and manage gardening tips, watering guides, and plant care blog posts.
          </p>
        </div>
      </div>

      {/* Blog Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-3xl border border-emerald-100 shadow-soft p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-900/90 text-white text-[11px] font-semibold">
                  {blog.category}
                </span>
              </div>

              <span className="text-[11px] text-slate-500 font-semibold">{blog.readTime}</span>
              <h3 className="font-display font-bold text-base text-slate-900 leading-tight">
                {blog.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {blog.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setEditingBlog(blog)}
                icon={<Edit2 className="w-3.5 h-3.5" />}
              >
                Edit
              </Button>

              <button
                onClick={() => handleDelete(blog.id)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                title="Delete Blog"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Blog Modal */}
      <AnimatePresence>
        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingBlog(null)}
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
                  Edit Blog Article
                </h3>
                <button
                  onClick={() => setEditingBlog(null)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Excerpt</label>
                  <textarea
                    rows={2}
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Category</label>
                    <input
                      type="text"
                      value={editingBlog.category}
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Read Time</label>
                    <input
                      type="text"
                      value={editingBlog.readTime}
                      onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Image Path</label>
                  <input
                    type="text"
                    value={editingBlog.image}
                    onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setEditingBlog(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    Save Blog
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
