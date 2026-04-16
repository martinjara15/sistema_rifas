import { Raffle } from "@/lib/types";

export const raffles: Raffle[] = [
  {
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    emoji: "\ud83d\udcf1",
    description: "iPhone 16 Pro 256GB - Color Titanio Natural",
    pricePerNumber: 5000,
    totalNumbers: 100,
    soldNumbers: [3, 7, 12, 15, 22, 28, 31, 34, 45, 51, 58, 63, 67, 72, 78, 84, 89, 93, 97],
    drawDate: "2025-02-15",
  },
  {
    slug: "pc",
    name: "PC",
    emoji: "\ud83d\udda5\ufe0f",
    description: "PC completa con monitor, teclado y mouse",
    pricePerNumber: 8000,
    totalNumbers: 100,
    soldNumbers: [2, 9, 14, 21, 26, 33, 38, 44, 52, 59, 66, 73, 79, 86, 92, 98],
    drawDate: "2025-02-28",
  },
];
