import React, { useState } from 'react';
import { useMembers } from '../context/MemberContext';
import MemberTable from './MemberTable';
import MemberModal from './MemberModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { UserPlus, Search, RefreshCw, Users, ShieldAlert } from 'lucide-react';

const MemberCRUD = () => {
  const { members, loading, fetchMembers, openModal } = useMembers();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section id="crud-section" className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-4 border-[#1F2937] gap-4">
          <div>
            <div className="inline-block bg-[#FDB913] text-[#1F2937] px-3.5 py-1 border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] text-xs font-black uppercase tracking-wider mb-2">
              Sistem Manajemen Data
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#1F2937] tracking-tight">
              CRUD Member List
            </h2>
            <p className="text-sm font-semibold text-gray-600 mt-2">
              Kelola data nama, NIM, role, kontribusi, dan foto profil seluruh anggota kelompok secara realtime.
            </p>
          </div>

          {/* Action Button: Tambah Member */}
          <div className="flex-shrink-0">
            <button
              onClick={() => openModal('create')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#FDB913] text-[#1F2937] border-3 border-[#1F2937] shadow-[5px_5px_0px_0px_#1F2937] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#1F2937] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1F2937] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-5 h-5" />
              Tambah Member
            </button>
          </div>
        </div>

        {/* Toolbar: Search and Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6">
          
          {/* Search Bar */}
          <div className="sm:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, NIM, role, atau kontribusi..."
              className="w-full pl-10 pr-4 py-3 bg-white border-3 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] font-semibold text-sm placeholder-gray-500 focus:outline-none focus:border-[#1B5E8F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-gray-500 hover:text-black uppercase"
              >
                Reset
              </button>
            )}
          </div>

          {/* Refresh & Stats */}
          <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-3">
            <div className="px-4 py-3 bg-white border-3 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] font-bold text-xs uppercase flex items-center gap-2 flex-1 sm:flex-initial justify-center">
              <Users className="w-4 h-4 text-[#1B5E8F]" />
              <span>
                Total: <strong className="font-black text-[#1F2937]">{members.length}</strong>
              </span>
            </div>

            <button
              onClick={() => fetchMembers()}
              disabled={loading}
              className="p-3 bg-white text-[#1F2937] border-3 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] hover:bg-gray-100 active:translate-y-0.5 disabled:opacity-50"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#1B5E8F]' : ''}`} />
            </button>
          </div>

        </div>

        {/* Member Table */}
        <MemberTable searchQuery={searchQuery} />

        {/* Modals */}
        <MemberModal />
        <DeleteConfirmModal />

      </div>
    </section>
  );
};

export default MemberCRUD;
