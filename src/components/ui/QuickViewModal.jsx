import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowRight } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickAddProduct, setQuickAddProduct, addToCart, navigate } = useApp();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!quickAddProduct) return undefined;

    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setQuickAddProduct(null);
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [quickAddProduct, setQuickAddProduct]);

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(null);
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const product = quickAddProduct;
  const sizes = product.sizes || [];
  const colors = product.colors || [];
  const currentSize = selectedSize || sizes[0];
  const currentColor = selectedColor || colors[0]?.name || 'Default';

  const handleAdd = () => {
    addToCart(product, currentSize, currentColor, 1);
    setQuickAddProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <button
        type="button"
        onClick={() => setQuickAddProduct(null)}
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity cursor-default"
        aria-label="Close quick view dialog"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        aria-describedby="quick-view-description"
        className="relative w-full max-w-3xl bg-[#F7F5F0] border border-[#E8E2D8] text-[#111111] shadow-2xl z-10 overflow-hidden"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#666666] hover:text-[#111111] transition-colors cursor-pointer bg-white/80"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-4/5 md:aspect-auto bg-[#EFECE5] relative overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#111111] text-[#F7F5F0] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A52A2A]">{product.category}</span>
                <h2 id="quick-view-title" className="font-heading text-xl md:text-2xl font-semibold text-[#111111]">{product.name}</h2>
                <div className="flex items-center gap-3 pt-1">
                  <span className="font-heading text-lg font-bold text-[#111111]">₹{Number(product.price).toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#888888] line-through font-mono">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-[11px] text-[#A52A2A] font-semibold">Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>

              <p id="quick-view-description" className="text-xs text-[#666666] leading-relaxed">{product.descriptor || `Quick view of ${product.name}.`}</p>

              {colors.length > 0 && (
                <fieldset className="space-y-2 pt-2">
                  <legend className="text-[11px] font-semibold uppercase tracking-wider text-[#111111] mb-2">Color: <span className="text-[#666666] font-normal">{currentColor}</span></legend>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        aria-pressed={currentColor === color.name}
                        className={`px-3 py-1.5 text-xs border transition-all cursor-pointer ${currentColor === color.name ? 'border-[#111111] bg-[#111111] text-[#F7F5F0]' : 'border-[#E8E2D8] bg-white text-[#111111] hover:border-[#111111]'}`}
                      >{color.name}</button>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <legend className="text-[11px] font-semibold uppercase tracking-wider text-[#111111]">Select UK / IND Size</legend>
                  <span className="text-[10px] text-[#666666] underline">True to size</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={currentSize === size}
                      className={`py-2 text-xs font-mono transition-all border cursor-pointer ${currentSize === size ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-semibold' : 'border-[#E8E2D8] bg-white text-[#111111] hover:border-[#111111]'}`}
                    >{size}</button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
              <button
                type="button"
                onClick={handleAdd}
                disabled={sizes.length > 0 && !currentSize}
                className="w-full py-3.5 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Add to Bag</span><ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => { setQuickAddProduct(null); navigate(`/product/${product.slug}`); }}
                className="w-full text-center text-[11px] text-[#666666] hover:text-[#111111] underline transition-colors cursor-pointer py-1"
              >View Full Details &amp; Sizing Guide →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
