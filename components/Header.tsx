import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-available rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
            R
          </div>
          <span className="text-text font-bold text-base group-hover:text-available transition-colors">
            Tu Tienda
          </span>
        </Link>
        <span className="text-text-muted text-xs hidden sm:block">Rifas Online</span>
      </div>
    </header>
  );
}
