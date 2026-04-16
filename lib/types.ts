export interface Raffle {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  pricePerNumber: number;
  totalNumbers: number;
  soldNumbers: number[];
  drawDate: string;
}
