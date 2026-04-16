import Link from "next/link";
import { Raffle } from "@/lib/types";

export default function RaffleCard({ raffle }: { raffle: Raffle }) {
  const available = raffle.totalNumbers - raffle.soldNumbers.length;
  const progress = (raffle.soldNumbers.length / raffle.totalNumbers) * 100;

  return (
    <Link href={`/rifa/${raffle.slug}`} className="block group">
      <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-available/40 transition-all duration-200 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]">
        {/* Emoji + Name */}
        <div className="text-center mb-4">
          <span className="text-5xl block mb-3">{raffle.emoji}</span>
          <h2 className="text-text text-xl font-extrabold">{raffle.name}</h2>
          <p className="text-text-secondary text-sm mt-1">{raffle.description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-4">
          <span className="text-available text-2xl font-extrabold">
            ${raffle.pricePerNumber.toLocaleString("es-AR")}
          </span>
          <span className="text-text-muted text-sm ml-1">/ numero</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-text-secondary">
              {raffle.soldNumbers.length} vendidos
            </span>
            <span className="text-available font-semibold">
              {available} disponibles
            </span>
          </div>
          <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-available to-accent rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Draw date */}
        <div className="text-center text-text-muted text-xs">
          Sorteo: {new Date(raffle.drawDate + "T12:00:00").toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <span className="inline-block bg-available/15 text-available px-5 py-2 rounded-lg text-sm font-bold group-hover:bg-available/25 transition-colors">
            Ver numeros
          </span>
        </div>
      </div>
    </Link>
  );
}
