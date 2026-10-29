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

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

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
      if (data.role === "ADMIN") {
        router.push("/admin/news");
      } else {
        router.push("/admin");
      }
      router.refresh();
    } catch {
      setError("Terjadi kendala jaringan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-portal min-h-screen relative flex items-center justify-center bg-[#0e0409] px-4 font-sans text-[#f8f1e7] selection:bg-brand-neon selection:text-brand-dark">
      {/* Fixed Ambient Background Canvas */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[#0e0409] overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-radial-1 opacity-90" />
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-neon/10 blur-[130px] rounded-full" />
      </div>

      <div className="w-full max-w-sm space-y-5 relative z-10">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#d4c0bd] hover:text-[#f8f1e7] transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Kembali ke Website Publik</span>
        </Link>

        {/* Card */}
        <div className="bg-[#1a1517]/95 border border-[#6d2031] rounded-3xl p-7 md:p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.40)] space-y-6">
          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-[#23121b] border border-[#6d2031] flex items-center justify-center p-2 shadow-sm">
              <img
                src="/logo.png"
                alt="Logo BEM FH UNAND"
                className="h-full w-auto object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#f8f1e7] tracking-tight">
                Portal Admin
              </h1>
              <p className="text-xs text-[#d4c0bd] mt-1">
                BEM Fakultas Hukum Universitas Andalas
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="text-xs text-rose-200 bg-[#3a0d18] border border-[#9e1c38] rounded-xl p-3"
            >
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#e3bbb9]">
                Alamat Email Akun
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={15} aria-hidden="true" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@bemfhunand.org"
                  className="w-full rounded-xl bg-[#14080e] border border-[#6d2031] pl-10 pr-3.5 py-2.5 text-xs text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#d4c0bd]">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={15} aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-[#14080e] border border-[#6d2031] pl-10 pr-10 py-2.5 text-xs text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-brand-neon transition-colors"
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
              className="w-full py-2.5 rounded-xl bg-[#9e1c38] hover:bg-[#ba2243] active:scale-[0.99] text-[#f8f1e7] border border-[#ba2243] font-bold text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-md cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2
                    size={14}
                    className="animate-spin text-white"
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
          <div className="pt-2 border-t border-[#6d2031]/50 flex items-center justify-center gap-1.5 text-[11px] text-[#d4c0bd]/80">
            <Shield size={12} className="text-brand-neon" aria-hidden="true" />
            <span>Akses Terbatas untuk Pengurus BEM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
