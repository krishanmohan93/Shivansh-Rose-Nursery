'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  Filter, 
  X, 
  Save, 
  MessageSquare,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AdminReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  plantPurchased: string;
  comment: string;
  isActive: boolean;
  isFeatured: boolean;
  helpfulCount: number;
}

/**
 * ReviewManager component for Admin Portal to view, edit, toggle visibility, and delete customer reviews.
 */
export const ReviewManager: React.FC = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([
    {
      id: 'rev-1',
      name: 'Priya Deshmukh',
      location: 'Wakad, Pune',
      rating: 5,
      date: '2026-08-05',
      verified: true,
      plantPurchased: 'Areca Palm & Ceramic Pots',
      comment: 'Bought 4 Areca Palms and ceramic planters for my balcony. The quality and plant health are unmatched! Their team even gave me exact watering tips. Highly recommend Shivansh Rose Nursery!',
      isActive: true,
      isFeatured: true,
      helpfulCount: 24,
    },
    {
      id: 'rev-2',
      name: 'Amitabh Joshi',
      location: 'Hinjawadi, Pune',
      rating: 5,
      date: '2026-07-28',
      verified: true,
      plantPurchased: 'Chinese Porcelain Pots & Bonsai',
      comment: 'The imported Chinese porcelain planters are stunning! You won\'t find this kind of premium collection anywhere else in Pune. Excellent customer service and careful packing.',
      isActive: true,
      isFeatured: true,
      helpfulCount: 18,
    },
    {
      id: 'rev-3',
      name: 'Sneha Kulkarni',
      location: 'Baner, Pune',
      rating: 5,
      date: '2026-07-20',
      verified: true,
      plantPurchased: 'Terrace Garden Setup Service',
      comment: 'Shivansh team transformed our apartment terrace into a lush green paradise! Right from choosing low-maintenance plants to installing sturdy stands, everything was super professional.',
      isActive: true,
      isFeatured: true,
      helpfulCount: 31,
    },
    {
      id: 'rev-4',
      name: 'Rajesh Patil',
      location: 'Pimple Saudagar, Pune',
      rating: 5,
      date: '2026-07-15',
      verified: true,
      plantPurchased: 'Snake Plants & Succulents',
      comment: 'Super healthy air-purifying plants! Prices are very reasonable compared to online plant portals. The owner personally guided me on succulent care.',
      isActive: true,
      isFeatured: false,
      helpfulCount: 15,
    },
    {
      id: 'rev-5',
      name: 'Pooja Agarwal',
      location: 'Kothrud, Pune',
      rating: 4,
      date: '2026-07-01',
      verified: true,
      plantPurchased: 'Monstera Deliciosa & Fiber Pots',
      comment: 'Extremely happy with my Monstera Deliciosa. Fresh green leaves without any blemishes. The lightweight fiber pots look super stylish in my living room!',
      isActive: true,
      isFeatured: false,
      helpfulCount: 22,
    },
    {
      id: 'rev-6',
      name: 'Vikram Mehta',
      location: 'Aundh, Pune',
      rating: 5,
      date: 'Just now',
      verified: true,
      plantPurchased: 'Bonsai & Ceramic Planter',
      comment: 'Submitted via website: Fantastic customer care and guidance on maintaining my ficus bonsai!',
      isActive: false, // Pending Admin Moderation
      isFeatured: false,
      helpfulCount: 1,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  
  // Modals & Editing states
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  // New review form state
  const [newReview, setNewReview] = useState<Omit<AdminReview, 'id'>>({
    name: '',
    location: 'Pune',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    verified: true,
    plantPurchased: '',
    comment: '',
    isActive: true,
    isFeatured: false,
    helpfulCount: 0,
  });

  const showToast = (message: string, type: 'success' | 'danger' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Toggle review active/inactive status
  const handleToggleActive = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updatedState = !r.isActive;
          showToast(
            updatedState ? `Review published to website!` : `Review hidden from website!`,
            updatedState ? 'success' : 'danger'
          );
          return { ...r, isActive: updatedState };
        }
        return r;
      })
    );
  };

  // Delete review handler
  const handleDeleteConfirm = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeletingId(null);
    showToast('Review removed successfully!', 'danger');
  };

  // Save Edit Review
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setReviews((prev) =>
      prev.map((r) => (r.id === editingReview.id ? editingReview : r))
    );
    setEditingReview(null);
    showToast('Review updated successfully!', 'success');
  };

  // Add New Review Handler
  const handleAddNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const created: AdminReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
    };

    setReviews([created, ...reviews]);
    setIsAddModalOpen(false);
    showToast('New review added to database!', 'success');

    // Reset form
    setNewReview({
      name: '',
      location: 'Pune',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      plantPurchased: '',
      comment: '',
      isActive: true,
      isFeatured: false,
      helpfulCount: 0,
    });
  };

  // Filtered list
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.plantPurchased.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = ratingFilter === 'all' || r.rating === ratingFilter;

    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold flex items-center gap-2.5 text-white ${
              notification.type === 'success' ? 'bg-emerald-700 border-emerald-500' : 'bg-red-700 border-red-500'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" /> Customer Reviews Management
          </h2>
          <p className="text-sm text-slate-600">
            View, edit, approve, hide or remove customer reviews displayed on the website.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
          className="shadow-md"
        >
          Add Manual Review
        </Button>
      </div>

      {/* Controls Bar: Search & Rating Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, location, text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Rating Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Rating:
          </span>
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              ratingFilter === 'all' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setRatingFilter(star)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                ratingFilter === star ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{star}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 tracking-wider">
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-6">Review & Purchased Item</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No reviews found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-emerald-50/30 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-6 align-top">
                      <div className="font-semibold text-slate-900">{review.name}</div>
                      <div className="text-xs text-slate-500">{review.location}</div>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full mt-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-4 align-top">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 mt-1 block">
                        {review.rating}/5 Stars
                      </span>
                    </td>

                    {/* Review Text & Item */}
                    <td className="py-4 px-6 align-top max-w-md">
                      {review.plantPurchased && (
                        <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-md font-medium mb-1 border border-slate-200">
                          🌿 {review.plantPurchased}
                        </span>
                      )}
                      <p className="text-slate-700 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 align-top text-xs text-slate-500 whitespace-nowrap">
                      {review.date}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 align-top">
                      <button
                        onClick={() => handleToggleActive(review.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                          review.isActive
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {review.isActive ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" /> Hidden
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action Buttons: Edit & Remove */}
                    <td className="py-4 px-6 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingReview(review)}
                          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-colors"
                          title="Edit Review"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Remove Button */}
                        <button
                          onClick={() => setDeletingId(review.id)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete Review"
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

      {/* EDIT REVIEW MODAL */}
      <AnimatePresence>
        {editingReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingReview(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" /> Edit Customer Review
                </h3>
                <button
                  onClick={() => setEditingReview(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                    <input
                      type="text"
                      required
                      value={editingReview.name}
                      onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Location</label>
                    <input
                      type="text"
                      value={editingReview.location}
                      onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Rating (1 to 5)</label>
                    <select
                      value={editingReview.rating}
                      onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    >
                      <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                      <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                      <option value={3}>3 Stars ⭐⭐⭐</option>
                      <option value={2}>2 Stars ⭐⭐</option>
                      <option value={1}>1 Star ⭐</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">Plant / Service</label>
                    <input
                      type="text"
                      value={editingReview.plantPurchased}
                      onChange={(e) => setEditingReview({ ...editingReview, plantPurchased: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Review Text</label>
                  <textarea
                    rows={4}
                    required
                    value={editingReview.comment}
                    onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1 resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingReview.verified}
                      onChange={(e) => setEditingReview({ ...editingReview, verified: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    Verified Buyer
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingReview.isActive}
                      onChange={(e) => setEditingReview({ ...editingReview, isActive: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    Published on Website
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setEditingReview(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" icon={<Save className="w-4 h-4" />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM DELETE MODAL */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingId(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 border border-red-100 text-center space-y-4"
            >
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Remove Review?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Are you sure you want to permanently delete this customer review? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <Button variant="ghost" size="md" onClick={() => setDeletingId(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleDeleteConfirm(deletingId)}
                  className="bg-red-600 hover:bg-red-700 text-white shadow-md"
                >
                  Yes, Remove
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD NEW REVIEW MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" /> Add Manual Review
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNewReview} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Wakad, Pune"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    >
                      <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                      <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                      <option value={3}>3 Stars ⭐⭐⭐</option>
                      <option value={2}>2 Stars ⭐⭐</option>
                      <option value={1}>1 Star ⭐</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">Plant / Service</label>
                    <input
                      type="text"
                      placeholder="e.g. Ceramic Pots"
                      value={newReview.plantPurchased}
                      onChange={(e) => setNewReview({ ...newReview, plantPurchased: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Review Comment *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter review feedback..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm mt-1 resize-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                    Add Review
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
