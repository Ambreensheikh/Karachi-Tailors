'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scissors, LayoutDashboard, Image, Video, LogOut, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio Images', href: '/admin/portfolio', icon: Image },
    { name: 'Videos', href: '/admin/videos', icon: Video },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-dark-800 border-r border-gold-600/20 p-6 fixed h-full">
      
      {/* Logo */}
      <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8">
        <Scissors className="w-6 h-6 text-gold-400" />
        <span className="font-serif text-xl font-bold text-white">
          Karachi <span className="text-gold-400">Tailors</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${active
                  ? 'bg-gold-600/20 text-gold-400'
                  : 'text-gray-400 hover:text-gold-400 hover:bg-gold-600/10'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <form action="/api/admin/logout" method="POST" className="mt-8">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </form>
    </aside>
  );
}