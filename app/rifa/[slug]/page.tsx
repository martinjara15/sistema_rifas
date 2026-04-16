"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { raffles } from "@/data/raffles";
import RaffleGrid from "@/components/RaffleGrid";
import RaffleCart from "@/components/RaffleCart";

const RESERVE_TIME = 600; // 10 minutes in seconds

export default function RifaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const raffle = raffles.find((r) => r.slug === slug);

  const [selected, setSelected] = useState<number[]>([]);
  const [reserveSeconds, setReserveSeconds] = useState(RESERVE_TIME);

  // Reserve countdown timer
  useEffect(() => {
    if (selected.length === 0) {
      setReserveSeconds(RESERVE_TIME);
      return;
    }

    const interval = setInterval(() => {
      setReserveSeconds((prev) => {
        if (prev <= 1) {
          setSelected([]);
          return RESERVE_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selected.length]);

  // Reset timer when selection changes
  const handleSelect = useCallback((n: number) => {
    setSelected((prev) => {
      const next = prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n];
      return next;
    });
    setReserveSeconds(RESERVE_TIME);
  }, []);

  if (!raffle) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-text text-2xl font-bold mb-4">Rifa no encontrada</h1>
        <Link href="/" className="text-available hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const available = raffle.totalNumbers - raffle.soldNumbers.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link href="/" className="text-text-muted text-sm hover:text-available transition-colors">
          &larr; Todas las rifas
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-2 block">{raffle.emoji}</span>
        <h1 className="text-text text-2xl font-extrabold">{raffle.name}</h1>
        <p className="text-text-secondary text-sm mt-1">{raffle.description}</p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <span className="text-available text-lg font-bold">
            ${raffle.pricePerNumber.toLocaleString("es-AR")} / numero
          </span>
          <span className="text-text-muted text-xs">
            {available} de {raffle.totalNumbers} disponibles
          </span>
        </div>
      </div>

      {/* Hint */}
      <p className="text-text-secondary text-[13px] text-center mb-4">
        <strong className="text-text">Toque los numeros verdes</strong> para seleccionarlos.
        Seleccione 4 o mas para obtener un 20% de descuento.
      </p>

      {/* Legend */}
      <div className="flex gap-4 justify-center mb-5">
        {[
          { color: "bg-available", label: "Disponible" },
          { color: "bg-selected", label: "Seleccionado" },
          { color: "bg-sold", label: "Vendido" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-[6px]">
            <div className={`w-3.5 h-3.5 rounded-[3px] ${item.color}`} />
            <span className="text-text-secondary text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Grid + Cart layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Grid */}
        <div className="flex-1 bg-bg-card rounded-xl p-4 sm:p-5 border border-border min-w-0">
          <RaffleGrid
            totalNumbers={raffle.totalNumbers}
            soldNumbers={raffle.soldNumbers}
            selected={selected}
            onSelect={handleSelect}
          />
        </div>

        {/* Cart */}
        <div className="w-full lg:w-[280px] lg:flex-shrink-0">
          <RaffleCart
            selected={selected}
            pricePerNumber={raffle.pricePerNumber}
            onRemove={(n) => handleSelect(n)}
            reserveSeconds={reserveSeconds}
          />
        </div>
      </div>

      {/* Other raffles */}
      {raffles.length > 1 && (
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-text-secondary text-sm font-bold mb-3 text-center">
            Otras rifas disponibles
          </h3>
          <div className="flex gap-3 justify-center flex-wrap">
            {raffles
              .filter((r) => r.slug !== slug)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/rifa/${r.slug}`}
                  className="flex items-center gap-2 bg-bg-secondary/50 border border-border px-4 py-2 rounded-lg hover:border-available/40 transition-all text-sm"
                >
                  <span className="text-lg">{r.emoji}</span>
                  <span className="text-text font-semibold">{r.name}</span>
                  <span className="text-text-muted text-xs">
                    ${r.pricePerNumber.toLocaleString("es-AR")}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
