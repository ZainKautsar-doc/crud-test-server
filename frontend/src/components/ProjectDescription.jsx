import React from 'react';
import { Cpu, Layers, Terminal, Globe, CheckCircle, ArrowUpRight } from 'lucide-react';

const milestones = [
  {
    number: '01',
    title: 'Membangun Lingkungan Virtualisasi (Nested Hypervisor)',
    tag: 'Hypervisor Level',
    icon: Cpu,
    color: '#1B5E8F',
    textColor: 'text-white',
    description:
      'Kelompok Anda menginstal hypervisor Proxmox VE 8.2 di dalam Oracle VirtualBox. Setelah itu, kelompok melakukan alokasi sumber daya seperti vCPU, RAM (8GB), dan penyimpanan virtual (64GB). Anda juga telah mengonfigurasi jaringan dan berhasil memvalidasi kesiapan dashboard berbasis web Proxmox.',
    badges: ['Proxmox VE 8.2', 'Oracle VirtualBox', '8GB RAM', '64GB Storage'],
  },
  {
    number: '02',
    title: 'Pembuatan & Replikasi 3 Server Virtual (Multi-Instance)',
    tag: 'Virtual Machines',
    icon: Layers,
    color: '#FDB913',
    textColor: 'text-[#1F2937]',
    description:
      'Kelompok Anda membuat mesin virtual dengan sistem operasi Linux Debian 11 versi minimalis (berbasis CLI murni) agar hemat sumber daya. Server tersebut kemudian direplikasi menjadi tiga server virtual (debian-vm1, debian-vm2, dan debian-vm3) yang berhasil berjalan masing-masing secara bersamaan di atas jaringan bridge lokal Proxmox.',
    badges: ['Debian 11 Minimal', 'debian-vm1', 'debian-vm2', 'debian-vm3'],
  },
  {
    number: '03',
    title: 'Konfigurasi Akses Remote (Multi-SSH Simultan)',
    tag: 'Network & Security',
    icon: Terminal,
    color: '#1B5E8F',
    textColor: 'text-white',
    description:
      'Anda memberikan alamat IP statis untuk ketiga server dan melakukan konfigurasi keamanan daemon OpenSSH (mengaktifkan PermitRootLogin). Hasilnya, ketiga server tersebut berhasil diakses secara bersamaan (simultan) menggunakan Command Prompt di Windows tanpa kendala.',
    badges: ['Static IP', 'OpenSSH Daemon', 'PermitRootLogin', 'Simultaneous Access'],
  },
  {
    number: '04',
    title: 'Deploy Web Server & Implementasi Reverse Tunneling',
    tag: 'Public Deployment',
    icon: Globe,
    color: '#FDB913',
    textColor: 'text-[#1F2937]',
    description:
      'Kelompok Anda memasang layanan web server Nginx pada server virtual untuk menguji beban kerja. Layanan web lokal ini kemudian diekspos agar bisa diakses oleh internet publik secara global menggunakan mekanisme reverse tunneling (menggunakan layanan Pinggy), dan akses ini berhasil tervalidasi.',
    badges: ['Nginx Web Server', 'Pinggy Tunnel', 'Public Internet', 'Validated'],
  },
];

const ProjectDescription = () => {
  return (
    <section id="project" className="py-20 bg-white border-b-4 border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block bg-[#1B5E8F] text-white px-4 py-1 border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] text-xs font-black uppercase tracking-wider">
            Dokumentasi & Arsitektur
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1F2937]">
            Deskripsi Project
          </h2>
          <p className="text-base text-gray-700 font-medium">
            Rangkaian implementasi rekayasa sistem yang dirancang, dibangun, dan divalidasi oleh Kelompok Mie Ayam.
          </p>
        </div>

        {/* 4 Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {milestones.map((item) => {
            const Icon = item.icon;
            const isBlue = item.color === '#1B5E8F';

            return (
              <div
                key={item.number}
                className="bg-[#F9FAFB] border-4 border-[#1F2937] shadow-[6px_6px_0px_0px_#1F2937] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[9px_9px_0px_0px_#1F2937] transition-all relative overflow-hidden"
              >
                {/* Milestone Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] flex items-center justify-center font-black ${
                          isBlue ? 'bg-[#1B5E8F] text-white' : 'bg-[#FDB913] text-[#1F2937]'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-black uppercase bg-white px-2.5 py-1 border-2 border-[#1F2937]">
                        Tahap {item.number}
                      </span>
                    </div>

                    <span className="text-xs font-black uppercase text-[#1B5E8F] bg-[#FEF3C7] px-2.5 py-1 border border-[#1F2937]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] uppercase tracking-tight mb-4 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-800 leading-relaxed font-normal mb-6 text-justify">
                    {item.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t-2 border-[#1F2937]/20 flex flex-wrap gap-2">
                  {item.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-1 bg-white border border-[#1F2937] text-[#1F2937]"
                    >
                      <CheckCircle className="w-3 h-3 text-[#16A34A]" />
                      {b}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectDescription;
