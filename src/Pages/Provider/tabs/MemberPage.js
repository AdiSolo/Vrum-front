import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import MemberSinglePage from '../manageTeam/memberSinglePage';
function MemberPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {/* Page header */}
            <div className='mb-8'>
              {/* Title */}
              <h1 className='text-2xl md:text-3xl text-slate-800 font-bold'>
                My Team ✨
              </h1>
            </div>

            {/* Content */}
            <div className='flex bg-white shadow-lg rounded-sm mb-8'>
              <div className='w-full'>
                <MemberSinglePage />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MemberPage;
