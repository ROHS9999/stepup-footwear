import React, { useState } from 'react';

export const ProductReviews = ({ product }) => {
  const storageKey = `stepup_reviews_${product.id}`;

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const submitReview = (event) => {
    event.preventDefault();

    if (!comment.trim()) return;

    const updated = [
      {
        id: crypto.randomUUID(),
        rating,
        comment: comment.trim(),
        date: new Date().toISOString()
      },
      ...reviews
    ];

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setReviews(updated);
      setComment('');
      setRating(5);
      setError('');
    } catch {
      setError('Unable to save your review.');
    }
  };

  return (
    <section className="border-t border-[#E8E2D8] pt-10 space-y-6">
      <h2 className="text-2xl font-bold uppercase">
        Product Reviews
      </h2>

      <p className="text-sm text-gray-600">
        Reviews are saved on this browser only.
      </p>

      <form onSubmit={submitReview} className="space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`${star} star rating`}
              aria-pressed={rating === star}
              onClick={() => setRating(star)}
              className={`text-3xl ${
                star <= rating
                  ? 'text-amber-500'
                  : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          aria-label="Your product review"
          className="w-full border p-4"
          maxLength={1000}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3"
        >
          Submit Review
        </button>

        {error && <p role="alert">{error}</p>}
      </form>

      {reviews.length === 0 && (
        <p className="text-gray-500">
          No locally submitted reviews yet.
        </p>
      )}

      {reviews.map((review) => (
        <article key={review.id} className="border p-4 space-y-2">
          <div className="text-amber-500">
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)}
          </div>

          <p>{review.comment}</p>

          <small className="text-gray-500">
            {new Date(review.date).toLocaleDateString('en-IN')}
          </small>
        </article>
      ))}
    </section>
  );
};