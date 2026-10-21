"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function VisiMisiInteractive({ visi, misi, profileVisiMisi }) {
  return (
    <section id="visi-misi" className="scroll-mt-24 py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header with fluid scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-left"
        >
          <span className="text-xs text-brand-neon uppercase tracking-wider font-semibold block mb-1">
            Landasan Pergerakan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ivory tracking-tight">
            Visi &amp; Misi
          </h2>
        </motion.div>

        {profileVisiMisi ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 rounded bg-brand-card border border-brand-border text-brand-ivory whitespace-pre-wrap leading-relaxed text-base"
          >
            {profileVisiMisi}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 bg-brand-card border border-brand-border rounded p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-brand-border-hover transition-colors"
            >
              {/* Subtle crimson ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-48 h-48 bg-brand-border/30 rounded-full blur-3xl pointer-events-none"
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-1 rounded bg-brand-burgundy border border-brand-border text-brand-neon text-s font-semibold uppercase tracking-wider">
                    Visi
                  </span>
                  <Quote
                    className="text-brand-border group-hover:text-brand-border-hover transition-colors"
                    size={32}
                  />
                </div>

                <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-brand-ivory leading-relaxed">
                  {visi}
                </blockquote>
              </div>

              <div className="pt-8 mt-6 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-ivory-muted">
                <span className="font-semibold text-brand-ivory">
                  Kabinet Aksara Juang
                </span>
                <span>BEM FH UNAND</span>
              </div>
            </motion.div>

            {/* Right Column: Strategic Missions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 bg-brand-card/70 border border-brand-border/40 rounded p-7 sm:p-9 flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold text-brand-ivory mb-6 flex items-center gap-2">
                <span>Misi</span>
              </h3>

              <div className="space-y-4">
                {misi.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 * idx,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-start gap-4 pb-4 border-b border-brand-ivory/10 last:border-b-0 last:pb-0 group"
                  >
                    <span className="w-8 h-8 rounded bg-brand-burgundy border border-brand-border text-brand-ivory font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand-neon/50 group-hover:text-brand-neon transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm sm:text-base text-brand-ivory-muted leading-relaxed group-hover:text-brand-ivory transition-colors">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
