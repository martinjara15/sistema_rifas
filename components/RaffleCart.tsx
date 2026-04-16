"use client";

interface RaffleCartProps {
  selected: number[];
  pricePerNumber: number;
  onRemove: (n: number) => void;
  reserveSeconds: number;
}

export default function RaffleCart({
  selected,
  pricePerNumber,
  onRemove,
  reserveSeconds,
}: RaffleCartProps) {
  const sorted = [...selected].sort((a, b) => a - b);
  const count = selected.length;
  const discount = count >= 4 ? 0.2 : 0;
  const subtotal = count * pricePerNumber;
  const total = subtotal * (1 - discount);
  const missing = 4 - count;

  const minutes = Math.floor(reserveSeconds / 60);
  const seconds = reserveSeconds % 60;

  if (count === 0) {
    return (
      <div className="bg-bg-secondary/50 rounded-xl p-5 border border-border">
        <h4 className="text-text text-[15px] font-bold mb-3">Seleccion</h4>
        <p className="text-text-muted text-[13px]">
          Seleccione los numeros disponibles (en verde) para agregarlos.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary/50 rounded-xl p-5 border border-border">
      <h4 className="text-text text-[15px] font-bold mb-3">Seleccion</h4>

      {/* Reserve timer */}
      {count > 0 && (
        <div className="bg-selected/10 border border-selected/25 rounded-lg px-3 py-2 mb-3 text-center">
          <span className="text-selected text-xs font-semibold">
            Sus numeros estan reservados por {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Selected chips */}
      <div className="flex flex-wrap gap-1 mb-3">
        {sorted.map((n) => (
          <button
            key={n}
            onClick={() => onRemove(n)}
            className="bg-selected/20 text-selected px-2 py-[3px] rounded-md text-xs font-bold font-mono hover:bg-selected/30 transition-colors"
          >
            #{String(n).padStart(2, "0")} x
          </button>
        ))}
      </div>

      <div className="border-t border-border pt-3 flex flex-col gap-1">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-text-secondary text-xs">
            {count} numero{count > 1 ? "s" : ""} x ${pricePerNumber.toLocaleString("es-AR")}
          </span>
          <span className="text-text text-xs font-semibold">
            ${subtotal.toLocaleString("es-AR")}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between bg-available/10 rounded-md px-2 py-[5px]">
            <span className="text-discount text-xs font-semibold">Descuento 20%</span>
            <span className="text-discount text-xs font-bold">
              -${(subtotal - total).toLocaleString("es-AR")}
            </span>
          </div>
        )}

        {/* Incentive */}
        {count > 0 && count < 4 && (
          <div className="bg-selected/10 rounded-md px-2 py-[6px]">
            <span className="text-selected text-[11px]">
              Seleccione {missing} mas para obtener un <strong>20% de descuento</strong>
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between mt-2 pt-2 border-t border-border">
          <span className="text-text text-[15px] font-bold">Total</span>
          <span className="text-available text-xl font-extrabold">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-3">
        <button className="w-full py-3 bg-gradient-to-br from-available to-accent text-white rounded-[10px] text-sm font-bold cursor-pointer shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all">
          Pagar con MercadoPago
        </button>
        <button className="w-full py-[10px] bg-whatsapp/10 text-whatsapp border border-whatsapp/25 rounded-[10px] text-[13px] font-semibold cursor-pointer hover:bg-whatsapp/20 transition-colors">
          Coordinar pago por WhatsApp
        </button>
      </div>
    </div>
  );
}
