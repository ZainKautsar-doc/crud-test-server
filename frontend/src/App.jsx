import React from 'react';
import { MemberProvider } from './context/MemberContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MembersQuickView from './components/MembersQuickView';
import ProjectDescription from './components/ProjectDescription';
import MemberCRUD from './components/MemberCRUD';
import Toast from './components/Toast';
import { Terminal, Heart } from 'lucide-react';

function App() {
  return (
    <MemberProvider>
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#1F2937]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Anggota Kelompok (Quick View) */}
          <MembersQuickView />

          {/* 3. Deskripsi Project (4 Milestones) */}
          <ProjectDescription />

          {/* 4. CRUD Member List (Table & Operations) */}
          <MemberCRUD />
        </main>

        {/* Footer */}
        <footer className="bg-[#13456B] text-white border-t-4 border-[#1F2937] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] flex items-center justify-center font-black text-xl">
                🍜
              </div>
              <div>
                <h4 className="font-black uppercase tracking-wider text-base">KELOMPOK MIE AYAM</h4>
                <p className="text-xs text-gray-300">Virtualisasi Sistem • Multi-SSH • Web Tunneling</p>
              </div>
            </div>

            <div className="text-xs text-gray-300 text-center md:text-right font-medium">
              <p>© {new Date().getFullYear()} Kelompok Mie Ayam. All Rights Reserved.</p>
              <p className="mt-1 text-gray-400">
                Dibangun dengan React, Vite, Express, MySQL & Neo-Brutalism Design.
              </p>
            </div>

          </div>
        </footer>

        {/* Toast Feedback System */}
        <Toast />
      </div>
    </MemberProvider>
  );
}

export default App;
