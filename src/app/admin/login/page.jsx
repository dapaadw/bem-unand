"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Loader2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Email atau password salah.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kendala jaringan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-brand-dark px-4 font-sans text-white selection:bg-brand-neon selection:text-brand-dark">
      {/* Fixed Ambient Background Canvas */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-brand-dark overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-radial-1 opacity-95" />
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-neon/10 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-sm space-y-5 relative z-10">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-neon transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Kembali ke Website Publik</span>
        </Link>

        {/* Card */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-7 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="mx-auto h-14 w-14 rounded-xl bg-gradient-to-br from-brand-red to-brand-dark border border-brand-neon/40 flex items-center justify-center p-2 shadow-sm">
              <img
                src="/logo.png"
                alt="Logo BEM FH UNAND"
                className="h-full w-auto object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Portal Admin &amp; Dosen
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                BEM Fakultas Hukum Universitas Andalas
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3"
            >
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300">
                Alamat Email Akun
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={15} aria-hidden="true" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={15} aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-9 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-brand-neon"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={15} aria-hidden="true" />
                  ) : (
                    <Eye size={15} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-brand-neon hover:brightness-105 active:scale-[0.99] text-brand-dark font-bold text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2
                    size={14}
                    className="animate-spin text-brand-dark"
                    aria-hidden="true"
                  />
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <span>Masuk ke Panel</span>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <Shield size={12} className="text-brand-neon" aria-hidden="true" />
            <span>Akses terenkripsi Pengurus BEM &amp; Dosen Pembina</span>
          </div>
        </div>
      </div>
    </div>
  );
}
