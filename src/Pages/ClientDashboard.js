import React from 'react';
import NotFound from './NotFound';
function ClientDashboard() {
  return (
    <>
      <div className='container mx-auto my-4 mt-1o px-4 md:px-12'>
        <div className='bg-yellow-400 p-4 mb-4'>
          <h1 className='w-full text-center text-white'>Client Dashboard</h1>
        </div>
      </div>
      <NotFound />
    </>
  );
}
export default ClientDashboard;
