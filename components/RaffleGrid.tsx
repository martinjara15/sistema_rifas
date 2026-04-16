"use client";

interface RaffleGridProps {
  totalNumbers: number;
  soldNumbers: number[];
  selected: number[];
  onSelect: (n: number) => void;
}

export default function RaffleGrid({
  totalNumbers,
  soldNumbers,
  selected,
  onSelect,
}: RaffleGridProps) {
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-[5px] w-full">
      {numbers.map((n) => {
        const isSold = soldNumbers.includes(n);
        const isSelected = selected.includes(n);

        let classes =
          "aspect-square flex items-center justify-center rounded-[7px] font-bold font-mono text-[11px] sm:text-xs transition-all duration-150 border-2 ";
        if (isSold) {
          classes += "bg-sold border-sold-dark text-white/70 cursor-not-allowed";
        } else if (isSelected) {
          classes +=
            "bg-selected border-selected-dark text-white cursor-pointer scale-105 shadow-[0_3px_12px_rgba(245,158,11,0.4)]";
        } else {
          classes +=
            "bg-available border-available-hover text-white cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:brightness-110";
        }

        return (
          <button
            key={n}
            onClick={() => !isSold && onSelect(n)}
            className={classes}
            disabled={isSold}
            aria-label={`Numero ${n}${isSold ? " - vendido" : isSelected ? " - seleccionado" : " - disponible"}`}
          >
            {String(n).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );
}
