import React, { useState } from 'react';
import { Menu, X, Users, Server, Table, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Anggota', href: '#members-quick' },
    { label: 'Project', href: '#project' },
    { label: 'Kelola Data', href: '#crud-section' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#1B5E8F] border-b-4 border-[#1F2937] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#FDB913] border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] flex items-center justify-center font-black text-2xl text-[#1F2937] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_0px_#1F2937] transition-all">
              🍜
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase block leading-none">
                KELOMPOK MIE AYAM
              </span>
              <span className="text-xs font-semibold tracking-wider text-[#FDB913] uppercase mt-1 block">
                Portfolio & Server Management
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 font-bold text-sm uppercase tracking-wider text-white hover:text-[#1F2937] hover:bg-[#FDB913] border-2 border-transparent hover:border-[#1F2937] hover:shadow-[3px_3px_0px_0px_#1F2937] transition-all"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#crud-section"
              className="ml-3 px-4 py-2 bg-[#FDB913] text-[#1F2937] font-black text-sm uppercase tracking-wider border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#1F2937] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1F2937] transition-all flex items-center gap-1.5"
            >
              <Table className="w-4 h-4" />
              CRUD Tabel
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] active:translate-y-0.5"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#13456B] border-t-2 border-[#1F2937] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 font-bold text-base uppercase text-white bg-[#1B5E8F] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-[#FDB913] hover:text-[#1F2937]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#crud-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 font-black text-base uppercase text-[#1F2937] bg-[#FDB913] border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] text-center"
          >
            Buka Tabel CRUD
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
