import React from 'react';
import { ChevronRight, Server, Terminal, ShieldCheck, Database } from 'lucide-react';
import { useMembers } from '../context/MemberContext';

const HeroSection = () => {
  const { members, openModal } = useMembers();

  return (
    <section id="hero" className="relative bg-[#1B5E8F] text-white border-b-4 border-[#1F2937] overflow-hidden py-16 lg:py-24">
      {/* Background Decorative Neo-brutalism shapes */}
      <div className="absolute top-8 right-12 w-32 h-32 bg-[#FDB913] border-4 border-[#1F2937] shadow-[6px_6px_0px_0px_#1F2937] rotate-6 hidden lg:block opacity-90 pointer-events-none" />
      <div className="absolute bottom-10 right-48 w-20 h-20 bg-white border-4 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] -rotate-12 hidden lg:block pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#13456B] border-4 border-[#1F2937] rounded-none rotate-45 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Status Badges */}
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] font-black text-xs uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                Infrastruktur & Cloud Systems
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] font-black text-xs uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                Proxmox VE 8.2 Verified
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
              KELOMPOK <br />
              <span className="inline-block bg-[#FDB913] text-[#1F2937] px-4 py-1.5 border-4 border-[#1F2937] shadow-[6px_6px_0px_0px_#1F2937] mt-2 transform -rotate-1">
                MIE AYAM
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-100 font-medium max-w-2xl leading-relaxed border-l-4 border-[#FDB913] pl-4 bg-[#13456B]/60 py-2">
              Website portfolio resmi dan sistem manajemen data anggota kelompok "Mie Ayam". 
              Fokus pada eksplorasi teknologi virtualisasi server, konfigurasi multi-SSH simultan, 
              serta implementasi reverse tunneling publik yang tangguh.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#crud-section"
                className="px-6 py-3.5 bg-[#FDB913] text-[#1F2937] font-black uppercase tracking-wider border-3 border-[#1F2937] shadow-[5px_5px_0px_0px_#1F2937] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#1F2937] active:translate-y-1 active:shadow-[2px_2px_0px_0px_#1F2937] transition-all flex items-center gap-2 text-base"
              >
                Kelola Anggota ({members.length})
                <ChevronRight className="w-5 h-5" />
              </a>

              <a
                href="#project"
                className="px-6 py-3.5 bg-white text-[#1F2937] font-black uppercase tracking-wider border-3 border-[#1F2937] shadow-[5px_5px_0px_0px_#1F2937] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#1F2937] active:translate-y-1 active:shadow-[2px_2px_0px_0px_#1F2937] transition-all flex items-center gap-2 text-base"
              >
                Pelajari Project
              </a>
            </div>

          </div>

          {/* Right Card / Technical Specs Snapshot */}
          <div className="lg:col-span-4">
            <div className="bg-[#F9FAFB] text-[#1F2937] border-4 border-[#1F2937] shadow-[8px_8px_0px_0px_#1F2937] p-6 space-y-4 transform rotate-1">
              <div className="flex items-center justify-between border-b-2 border-[#1F2937] pb-3">
                <span className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#1B5E8F]" />
                  Status Cluster
                </span>
                <span className="px-2.5 py-0.5 bg-[#16A34A] text-white text-xs font-black uppercase border border-[#1F2937]">
                  Online
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold text-gray-600">Hypervisor:</span>
                  <span className="font-bold text-[#1B5E8F]">Proxmox VE 8.2</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold text-gray-600">Guest OS:</span>
                  <span className="font-bold">Debian 11 (3 Replicas)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold text-gray-600">Alokasi RAM:</span>
                  <span className="font-bold">8 GB Dedicated</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold text-gray-600">Disk Storage:</span>
                  <span className="font-bold">64 GB Virtual HDD</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold text-gray-600">Web Service:</span>
                  <span className="font-bold">Nginx + Reverse Tunnel</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openModal('create')}
                  className="w-full py-2.5 bg-[#1B5E8F] text-white font-black text-xs uppercase tracking-wider border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] hover:bg-[#13456B] active:translate-y-0.5"
                >
                  + Tambah Member Sekarang
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
