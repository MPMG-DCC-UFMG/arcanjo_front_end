import React, { ReactChild } from 'react';

function HeaderFooter({ children }: { children: ReactChild }) {
  return (<>
    <header className="bg-black text-white py-4">
      <div className="container mx-auto">
        Header
      </div>
    </header>
    <main>
      <div className="container mx-auto">
        {children}
      </div>
    </main>
    <footer className="bg-gray-500 text-white py-4">
      <div className="container mx-auto">
        Header
      </div>
    </footer>
  </>);
}

export default HeaderFooter;
