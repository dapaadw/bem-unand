"use client";

import { useEffect } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus",
  itemName = "",
  itemType = "data",
  isDeleting = false,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape" && !isDeleting) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
      onClick={() => {
        if (!isDeleting) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#160a12] border border-[#6d2031] rounded-3xl p-6 md:p-7 space-y-5 shadow-2xl shadow-rose-950/40 animate-in zoom-in-95 duration-150 overflow-hidden"
      >
        {/* Subtle Ambient Decorative Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-40 h-40 bg-[#ba2243]/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#3a0d18] to-[#1f0a12] text-rose-400 border border-[#ba2243]/50 shadow-[0_0_20px_rgba(244,63,94,0.25)] shrink-0">
              <AlertTriangle size={22} aria-hidden="true" />
            </div>
            <div>
              <h3
                id="delete-dialog-title"
                className="text-base font-bold text-[#f8f1e7] tracking-tight"
              >
                {title}
              </h3>
              <p className="text-xs text-[#d4c0bd]/80 mt-0.5">
                Tindakan penghapusan permanen sistem
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#23121b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon cursor-pointer disabled:opacity-40"
            aria-label="Tutup jendela konfirmasi"
          >
            <X size={18} />
          </button>
        </div>

        {/* Item Detail Card */}
        <div className="relative z-10 p-3.5 rounded-2xl bg-[#12060b] border border-[#6d2031]/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4c0bd]/70 font-mono">
            {itemType ? `Target ${itemType}` : "Item yang akan dihapus"}:
          </span>
          <p className="text-xs font-semibold text-[#f8f1e7] leading-relaxed line-clamp-2">
            {itemName || "Item terpilih"}
          </p>
        </div>

        {/* Warning Description */}
        <p
          id="delete-dialog-desc"
          className="relative z-10 text-xs text-[#d4c0bd] leading-relaxed"
        >
          Apakah Anda yakin ingin menghapus {itemType || "data"} ini? Seluruh
          informasi terkait akan dihapus secara permanen dari basis data dan
          rekam jejak aktivitas audit trail sistem akan diperbarui.
        </p>

        {/* Modal Actions */}
        <div className="relative z-10 flex items-center justify-end gap-3 pt-3 border-t border-[#6d2031]/50">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl bg-[#23121b] hover:bg-[#321825] text-xs font-medium text-[#d4c0bd] hover:text-[#f8f1e7] border border-[#6d2031] transition-all cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ba2243] to-[#9e1c38] hover:from-[#d1284d] hover:to-[#ba2243] text-[#f8f1e7] text-xs font-bold border border-rose-500/50 shadow-md shadow-rose-950/50 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Menghapus...</span>
              </>
            ) : (
              <>
                <Trash2 size={14} aria-hidden="true" />
                <span>Ya, Hapus Sekarang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
