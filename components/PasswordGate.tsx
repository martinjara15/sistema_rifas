"use client";

import { useState, useEffect, FormEvent } from "react";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("demo_auth");
    if (token === "authenticated") {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem("demo_auth", "authenticated");
        setAuthenticated(true);
      } else {
        setError("Clave incorrecta");
      }
    } catch {
      setError("Error de conexion");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-available border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-available/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-text text-2xl font-extrabold mb-1">Demo Privada</h1>
          <p className="text-text-secondary text-sm">
            Ingrese la clave para acceder a la demostracion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Clave de acceso"
            className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text placeholder:text-text-muted text-sm focus:outline-none focus:border-available/50 focus:ring-1 focus:ring-available/25 transition-all"
            autoFocus
          />
          {error && (
            <p className="text-sold text-xs text-center font-semibold">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting || !password}
            className="w-full py-3 bg-gradient-to-br from-available to-accent text-white rounded-xl text-sm font-bold disabled:opacity-50 transition-all hover:brightness-110"
          >
            {submitting ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
