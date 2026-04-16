import { raffles } from "@/data/raffles";
import RaffleCard from "@/components/RaffleCard";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="text-xs text-selected font-bold uppercase tracking-[3px] mb-2">
          Rifas Online
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-text mb-2">
          Elegi tu numero de la suerte
        </h1>
        <p className="text-text-secondary text-sm max-w-md mx-auto">
          Selecciona una rifa, elegi tus numeros y participa.
          Selecciona 4 o mas numeros y obtene un 20% de descuento.
        </p>
      </div>

      {/* Raffle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {raffles.map((raffle) => (
          <RaffleCard key={raffle.slug} raffle={raffle} />
        ))}
      </div>

      {/* Info */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {[
          {
            emoji: "\ud83d\udd22",
            title: "Elegi tus numeros",
            desc: "Selecciona los numeros que quieras de la grilla interactiva",
          },
          {
            emoji: "\ud83c\udff7\ufe0f",
            title: "Descuento automatico",
            desc: "20% de descuento al seleccionar 4 o mas numeros",
          },
          {
            emoji: "\ud83d\udcb3",
            title: "Pago facil",
            desc: "Paga con MercadoPago o coordina por WhatsApp",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="text-center p-5 bg-bg-card rounded-xl border border-border"
          >
            <span className="text-3xl block mb-2">{item.emoji}</span>
            <h3 className="text-text text-sm font-bold mb-1">{item.title}</h3>
            <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
