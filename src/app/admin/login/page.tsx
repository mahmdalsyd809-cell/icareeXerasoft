"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await login(formData);
      if (result.success) {
        router.push("/admin/products");
      } else {
        setError(result.error || "Login failed");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center">
      <div className="w-full max-w-md p-10 bg-surface-container border border-outline/10 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl text-on-surface mb-2">L&apos;Élixir Noir</h1>
          <p className="text-outline text-sm uppercase tracking-widest">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-outline mb-2">Username</label>
            <input 
              type="text"
              name="username"
              required
              className="w-full bg-surface border border-outline/20 rounded-none px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-outline mb-2">Password</label>
            <input 
              type="password"
              name="password"
              required
              className="w-full bg-surface border border-outline/20 rounded-none px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          {error && <p className="text-error text-xs text-center">{error}</p>}
          
          <button 
            type="submit"
            disabled={isPending}
            className={`w-full font-semibold uppercase tracking-[0.2em] text-sm py-4 rounded-full transition-all ${
              isPending ? "bg-surface text-outline cursor-not-allowed" : "bg-primary text-background hover:bg-primary-container"
            }`}
          >
            {isPending ? "Authenticating..." : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
