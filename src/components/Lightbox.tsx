import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface LightboxImage {
  src: string;
  caption: string;
}

/** Full-screen image viewer. Click backdrop, the ✕, or press Esc to close. */
export function Lightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-white/30 text-white transition-colors hover:bg-white/15"
          >
            <X size={18} />
          </button>

          <motion.figure
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full max-w-6xl flex-col items-center gap-3"
          >
            <img
              src={image.src}
              alt={image.caption}
              className="max-h-[82vh] w-auto max-w-full border border-white/20 bg-white"
            />
            <figcaption className="max-w-2xl text-center font-mono text-xs text-white/70">
              {image.caption}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
