import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    navigate
  } = useApp();

  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isWishlistOpen) return;
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsWishlistOpen(false);
      if (event.key !== 'Tab') return;
      const drawer = document.getElementById('stepup-wishlist-drawer');
      const focusable = drawer?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        aria-hidden="true"
        className="absolute inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          id="stepup-wishlist-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stepup-wishlist-title"
          className="w-screen max-w-md bg-[#F7F5F0] border-l border-[#E8E2D8] text-[#111111] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F7F5F0]">
            <div className="flex items-center gap-2">
              <h2 id="stepup-wishlist-title" className="font-heading text-lg font-semibold tracking-tight text-[#111111]">
                Saved Favorites
              </h2>
              <span className="text-xs text-[#666666] font-mono">({wishlist.length})</span>
            </div>
            <button
              ref={closeButtonRef}
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 -mr-2 text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFECE5] flex items-center justify-center text-[#666666]">
                  <Heart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-base font-semibold text-[#111111]">
                    No items saved yet
                  </h3>
                  <p className="text-xs text-[#666666] max-w-xs leading-relaxed">
                    Click the heart icon on any shoe to save it to your college rotation shortlist.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-2 px-6 py-3 bg-[#111111] text-[#F7F5F0] hover:bg-[#222222] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Browse Campus Styles
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-[#E8E2D8] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => { setIsWishlistOpen(false); navigate(`/product/${product.slug}`); }}
                    aria-label={`View ${product.name}`}
                    className="w-20 h-24 bg-[#F7F5F0] overflow-hidden shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button type="button" onClick={() => { setIsWishlistOpen(false); navigate(`/product/${product.slug}`); }} className="font-heading text-sm font-semibold text-[#111111] truncate text-left cursor-pointer hover:text-[#A52A2A] transition-colors" aria-label={`View ${product.name}`}>
                          {product.name}
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[#888888] hover:text-[#A52A2A] p-0.5 cursor-pointer"
                          aria-label={`Remove ${product.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#666666] mt-0.5 line-clamp-1">
                        {product.descriptor}
                      </p>
                      <span className="text-sm font-semibold text-[#111111] block mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product, product.sizes?.[0]);
                          toggleWishlist(product);
                        }}
                        className="w-full py-2 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Move to Bag</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
