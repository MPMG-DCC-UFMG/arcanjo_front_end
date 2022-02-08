import React, { ReactChild } from 'react';

function CenterVertical({ children }: { children: ReactChild }) {
  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default CenterVertical;
