'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquarePlus, 
  X, 
  Sparkles, 
  User, 
  Send, 
  Heart,
  Quote,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  plantPurchased: string;
  comment: string;
  helpfulCount: number;
  avatarBg: string;
}

/**
 * CustomerReviewsSection component allows users to view existing customer reviews
 * and submit new reviews with an interactive rating modal.
 */
export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      name: 'Priya Deshmukh',
      location: 'Wakad, Pune',
      rating: 5,
      date: '2 days ago',
      verified: true,
      plantPurchased: 'Areca Palm & Ceramic Pots',
      comment: 'Bought 4 Areca Palms and ceramic planters for my balcony. The quality and plant health are unmatched! Their team even gave me exact watering tips. Highly recommend Shivansh Rose Nursery!',
      helpfulCount: 24,
      avatarBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'rev-2',
      name: 'Amitabh Joshi',
      location: 'Hinjawadi, Pune',
      rating: 5,
      date: '1 week ago',
      verified: true,
      plantPurchased: 'Chinese Porcelain Pots & Bonsai',
      comment: 'The imported Chinese porcelain planters are stunning! You won\'t find this kind of premium collection anywhere else in Pune. Excellent customer service and careful packing.',
      helpfulCount: 18,
      avatarBg: 'bg-amber-600 text-white',
    },
    {
      id: 'rev-3',
      name: 'Sneha Kulkarni',
      location: 'Baner, Pune',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      plantPurchased: 'Terrace Garden Setup Service',
      comment: 'Shivansh team transformed our apartment terrace into a lush green paradise! Right from choosing low-maintenance plants to installing sturdy stands, everything was super professional.',
      helpfulCount: 31,
      avatarBg: 'bg-teal-600 text-white',
    },
    {
      id: 'rev-4',
      name: 'Rajesh Patil',
      location: 'Pimple Saudagar, Pune',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      plantPurchased: 'Snake Plants & Succulents',
      comment: 'Super healthy air-purifying plants! Prices are very reasonable compared to online plant portals. The owner personally guided me on succulent care.',
      helpfulCount: 15,
      avatarBg: 'bg-sky-600 text-white',
    },
    {
      id: 'rev-5',
      name: 'Pooja Agarwal',
      location: 'Kothrud, Pune',
      rating: 5,
      date: '1 month ago',
      verified: true,
      plantPurchased: 'Monstera Deliciosa & Fiber Pots',
      comment: 'Extremely happy with my Monstera Deliciosa. Fresh green leaves without any blemishes. The lightweight fiber pots look super stylish in my living room!',
      helpfulCount: 22,
      avatarBg: 'bg-rose-600 text-white',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'verified'>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  
  // Modal & Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formPlant, setFormPlant] = useState('');
  const [formComment, setFormComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleHelpfulClick = (id: string) => {
    if (likedReviews[id]) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount - 1 } : r))
      );
      setLikedReviews((prev) => ({ ...prev, [id]: false }));
    } else {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
      );
      setLikedReviews((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Review submitted by customer starts in pending approval state (isApproved: false)
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        name: formName.trim(),
        location: formLocation.trim() || 'Pune',
        rating: formRating,
        date: 'Just now',
        verified: true,
        plantPurchased: formPlant.trim() || 'Plants & Pots',
        comment: formComment.trim(),
        helpfulCount: 1,
        avatarBg: 'bg-emerald-600 text-white',
      };

      // Keep current active approved reviews on public site
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        // Reset form
        setFormName('');
        setFormLocation('');
        setFormRating(5);
        setFormPlant('');
        setFormComment('');
      }, 2500);
    }, 800);
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5star') return r.rating === 5;
    if (activeFilter === 'verified') return r.verified;
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 24px 50px -10px rgba(16, 185, 129, 0.25), 0 8px 20px -4px rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.45)',
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="py-12 sm:py-16 bg-background-cream relative overflow-hidden border-t border-surface-default">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2 border-b border-emerald-100/60">
          <div className="text-center md:text-left space-y-3 max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Customer Reviews & Ratings
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Loved by Plant Lovers Across Pune
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-slate-600 text-sm sm:text-base leading-relaxed"
            >
              Discover authentic reviews from real plant parents or share your own experience with Shivansh Rose Nursery.
            </motion.p>
          </div>

          {/* Overall Rating & Write Review Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-100 shadow-soft flex flex-col sm:flex-row items-center gap-5 shrink-0"
          >
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl font-extrabold text-slate-900">4.9</span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">1,200+ Verified Ratings</span>
                </div>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden sm:block" />

            <Button
              size="md"
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              icon={<MessageSquarePlus className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md"
            >
              Write a Review
            </Button>
          </motion.div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('5star')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === '5star'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Star className="w-3 h-3 fill-current text-amber-400" /> 5-Star Reviews
            </button>
            <button
              onClick={() => setActiveFilter('verified')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                activeFilter === 'verified'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Verified Buyers Only
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredReviews.length} reviews
          </span>
        </div>

        {/* Reviews Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover="hover"
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-soft flex flex-col justify-between cursor-pointer relative overflow-hidden"
              style={{ willChange: 'transform', borderWidth: '1px', borderStyle: 'solid' }}
            >
              {/* Top Decorative Quote Icon */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* User Info Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl ${review.avatarBg} font-display font-bold text-lg flex items-center justify-center shadow-xs shrink-0`}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-base leading-snug">
                        {review.name}
                      </h4>
                      <p className="text-xs text-slate-500">{review.location}</p>
                    </div>
                  </div>

                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>

                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{review.date}</span>
                </div>

                {/* Purchased Plant Tag */}
                {review.plantPurchased && (
                  <div className="inline-block bg-surface-low border border-slate-200/70 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                    🌿 Purchased: <span className="font-semibold text-emerald-800">{review.plantPurchased}</span>
                  </div>
                )}

                {/* Review Text */}
                <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed pt-1">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Card Footer: Helpful Button */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Was this review helpful?</span>
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                    likedReviews[review.id]
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[review.id] ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                  <span>{review.helpfulCount}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for Submitting a New Review */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              />

              {/* Dialog Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {submitSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">
                      Review Submitted for Approval!
                    </h3>
                    <p className="text-slate-600 text-sm max-w-xs mx-auto">
                      Thank you! Your feedback has been sent for admin verification. Once verified by our team, it will appear live on the website.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> Share Your Experience
                      </span>
                      <h3 className="font-display text-2xl font-bold text-slate-900">
                        Write a Customer Review
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Tell us about your experience with Shivansh Rose Nursery!
                      </p>
                    </div>

                    {/* Star Rating Picker */}
                    <div className="space-y-1.5 text-center bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                        Your Overall Rating
                      </label>
                      <div className="flex items-center justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormRating(star)}
                            onMouseEnter={() => setFormHoverRating(star)}
                            onMouseLeave={() => setFormHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (formHoverRating || formRating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-amber-600 block">
                        {formRating === 5 ? '⭐ 5/5 - Excellent!' : `${formRating}/5 Stars`}
                      </span>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g. Wakad, Pune"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Plant or Service Purchased
                      </label>
                      <input
                        type="text"
                        value={formPlant}
                        onChange={(e) => setFormPlant(e.target.value)}
                        placeholder="e.g. Areca Palm, Chinese Pots, Balcony Setup"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder="Share details about plant health, delivery, customer support, or garden transformation..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={isSubmitting}
                        icon={<Send className="w-4 h-4" />}
                      >
                        Submit Review
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
