import React from 'react';
import { useMembers } from '../context/MemberContext';
import { User, Users } from 'lucide-react';

const MembersQuickView = () => {
  const { members, loading } = useMembers();

  return (
    <section id="members-quick" className="py-16 bg-[#F9FAFB] border-b-4 border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-3 border-[#1F2937]">
          <div>
            <div className="inline-block bg-[#FDB913] text-[#1F2937] px-3 py-1 border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] text-xs font-black uppercase tracking-wider mb-2">
              Squad Member
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#1F2937] tracking-tight">
              Anggota Kelompok
            </h2>
          </div>
          <p className="text-sm font-semibold text-gray-600 mt-2 sm:mt-0">
            Total {members.length} Mahasiswa Berkontribusi
          </p>
        </div>

        {/* Loading State */}
        {loading && members.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="bg-white border-3 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937] p-5 animate-pulse space-y-3"
              >
                <div className="w-16 h-16 bg-gray-300 border-2 border-[#1F2937] mx-auto" />
                <div className="h-4 bg-gray-300 w-3/4 mx-auto" />
                <div className="h-3 bg-gray-200 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="bg-white border-3 border-[#1F2937] shadow-[5px_5px_0px_0px_#1F2937] p-5 flex flex-col items-center text-center relative group hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#1F2937] transition-all"
              >
                {/* Index Number Badge */}
                <div className="absolute top-2 left-2 bg-[#1B5E8F] text-white border-2 border-[#1F2937] text-[10px] font-black px-1.5 py-0.5">
                  #{index + 1}
                </div>

                {/* Profile Photo Thumbnail */}
                <div className="w-20 h-20 bg-gray-100 border-2 border-[#1F2937] shadow-[3px_3px_0px_0px_#1F2937] overflow-hidden mb-4 mt-2">
                  <img
                    src={member.foto_url}
                    alt={member.nama}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'http://localhost:5000/uploads/default-avatar.png';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-base font-black text-[#1F2937] tracking-tight leading-tight line-clamp-2">
                  {member.nama}
                </h3>

                {/* NIM */}
                <span className="font-mono text-xs font-bold text-gray-600 mt-1 bg-gray-100 px-2 py-0.5 border border-[#1F2937]/30">
                  NIM: {member.nim}
                </span>

                {/* Role Badge */}
                <div className="mt-3 w-full">
                  <span className="inline-block w-full py-1 px-2 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] font-black text-[11px] uppercase tracking-wider truncate">
                    {member.role}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default MembersQuickView;
