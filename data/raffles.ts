import { Raffle } from "@/lib/types";

export const raffles: Raffle[] = [
  {
    slug: "mate-imperial",
    name: "Mate Imperial",
    emoji: "\ud83e\uddc9",
    description: "Mate de algarrobo con virola de alpaca y bombilla de acero",
    pricePerNumber: 5000,
    totalNumbers: 100,
    soldNumbers: [3, 7, 12, 15, 22, 28, 31, 34, 45, 51, 58, 63, 67, 72, 78, 84, 89, 93, 97],
    drawDate: "2025-02-15",
  },
  {
    slug: "kit-matero",
    name: "Kit Matero Completo",
    emoji: "\ud83e\uddc9",
    description: "Mate, bombilla, termo Stanley y yerbera de cuero",
    pricePerNumber: 8000,
    totalNumbers: 100,
    soldNumbers: [2, 9, 14, 21, 26, 33, 38, 44, 52, 59, 66, 73, 79, 86, 92, 98],
    drawDate: "2025-02-28",
  },
];
