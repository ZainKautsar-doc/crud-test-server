import React, { useState, useMemo } from 'react';
import { useMembers } from '../context/MemberContext';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ImageOff } from 'lucide-react';

const MemberTable = ({ searchQuery }) => {
  const { members, loading, openModal, openDeleteDialog } = useMembers();
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter members by search query (nama, nim, role, kontribusi)
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const query = searchQuery.toLowerCase().trim();
    return members.filter(
      (m) =>
        m.nama.toLowerCase().includes(query) ||
        m.nim.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        m.kontribusi.toLowerCase().includes(query)
    );
  }, [members, searchQuery]);

  // Total pages
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;

  // Ensure current page is valid when filtering changes
  const activePage = Math.min(currentPage, totalPages);

  // Paginated slice
  const paginatedMembers = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, activePage, itemsPerPage]);

  return (
    <div className="space-y-4">
      
      {/* Table Container */}
      <div className="overflow-x-auto border-3 border-[#1F2937] shadow-[6px_6px_0px_0px_#1F2937] bg-white">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-[#1B5E8F] text-white border-b-3 border-[#1F2937]">
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider border-r-2 border-[#1F2937] w-14 text-center">
                No
              </th>
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider border-r-2 border-[#1F2937] w-24 text-center">
                Foto
              </th>
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider border-r-2 border-[#1F2937] min-w-[160px]">
                Nama Lengkap
              </th>
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider border-r-2 border-[#1F2937] min-w-[130px]">
                NIM
              </th>
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider border-r-2 border-[#1F2937] min-w-[150px]">
                Role
              </th>
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider border-r-2 border-[#1F2937] min-w-[220px]">
                Kontribusi
              </th>
              <th className="py-3.5 px-4 font-black uppercase text-xs tracking-wider text-center min-w-[160px]">
                Aksi
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y-2 divide-[#1F2937]">
            {loading && members.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-gray-500 font-bold uppercase text-sm">
                  Memuat data anggota kelompok...
                </td>
              </tr>
            ) : paginatedMembers.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-gray-500 font-bold uppercase text-sm">
                  {searchQuery ? `Tidak ada data yang cocok dengan pencarian "${searchQuery}".` : 'Belum ada data anggota kelompok.'}
                </td>
              </tr>
            ) : (
              paginatedMembers.map((member, index) => {
                const globalIndex = (activePage - 1) * itemsPerPage + index + 1;

                return (
                  <tr
                    key={member.id}
                    className="hover:bg-[#FEF3C7] transition-colors duration-100 group"
                  >
                    {/* No / ID */}
                    <td className="py-3 px-4 text-center font-mono font-black text-sm text-[#1F2937] border-r-2 border-[#1F2937]">
                      {globalIndex}
                    </td>

                    {/* Foto Profil Thumbnail (max 80x80px) */}
                    <td className="py-2.5 px-4 border-r-2 border-[#1F2937] text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gray-100 border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] overflow-hidden flex items-center justify-center group-hover:border-[#1F2937]">
                        <img
                          src={member.foto_url}
                          alt={member.nama}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'http://localhost:5000/uploads/default-avatar.png';
                          }}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </td>

                    {/* Nama */}
                    <td className="py-3 px-4 font-black text-sm text-[#1F2937] border-r-2 border-[#1F2937]">
                      {member.nama}
                    </td>

                    {/* NIM */}
                    <td className="py-3 px-4 font-mono font-bold text-xs text-gray-800 border-r-2 border-[#1F2937]">
                      <span className="bg-gray-100 px-2 py-1 border border-[#1F2937]">
                        {member.nim}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-4 border-r-2 border-[#1F2937]">
                      <span className="inline-block px-2.5 py-1 bg-[#1B5E8F] text-white font-black text-xs uppercase border border-[#1F2937]">
                        {member.role}
                      </span>
                    </td>

                    {/* Kontribusi */}
                    <td className="py-3 px-4 text-xs font-medium text-gray-800 leading-relaxed border-r-2 border-[#1F2937]">
                      <p className="line-clamp-3" title={member.kontribusi}>
                        {member.kontribusi}
                      </p>
                    </td>

                    {/* Aksi (Detail, Edit, Delete) */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        
                        {/* View Detail */}
                        <button
                          onClick={() => openModal('detail', member)}
                          className="p-2 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-gray-100 active:translate-y-0.5"
                          title="Lihat Detail"
                          aria-label="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openModal('edit', member)}
                          className="p-2 bg-[#FDB913] text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-yellow-400 active:translate-y-0.5"
                          title="Edit Member"
                          aria-label="Edit Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => openDeleteDialog(member)}
                          className="p-2 bg-[#DC2626] text-white border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] hover:bg-[#B91C1C] active:translate-y-0.5"
                          title="Hapus Member"
                          aria-label="Hapus Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Tampil jika members > 10 atau ada pagination) */}
      {filteredMembers.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-3 border-[#1F2937] shadow-[4px_4px_0px_0px_#1F2937]">
          
          <div className="text-xs font-bold uppercase text-gray-700">
            Menampilkan <span className="font-black text-[#1F2937]">{(activePage - 1) * itemsPerPage + 1}</span> -{' '}
            <span className="font-black text-[#1F2937]">
              {Math.min(activePage * itemsPerPage, filteredMembers.length)}
            </span>{' '}
            dari <span className="font-black text-[#1F2937]">{filteredMembers.length}</span> total anggota
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={activePage === 1}
              className="p-2 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Halaman Pertama"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={activePage === 1}
              className="px-3 py-1.5 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            {/* Page number indicators */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 font-black text-xs border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] transition-all ${
                  pageNum === activePage
                    ? 'bg-[#FDB913] text-[#1F2937]'
                    : 'bg-white text-[#1F2937] hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={activePage === totalPages}
              className="px-3 py-1.5 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={activePage === totalPages}
              className="p-2 bg-white text-[#1F2937] border-2 border-[#1F2937] shadow-[2px_2px_0px_0px_#1F2937] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              title="Halaman Terakhir"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default MemberTable;
