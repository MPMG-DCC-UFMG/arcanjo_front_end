import React, { ReactChild, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Greeting from '../components/Greeting';
import SidebarCard, { SidebarButton } from '../components/SidebarCard';
import { globalContext } from '../wrapper/GlobalContext';


interface SidebarProps {
  children: ReactChild,
  buttons?: SidebarButton[]
}

function Sidebar({ buttons, children }: SidebarProps) {
  const location = useLocation();
  const { currentUser, isSidebarClosed, setIsSidebarClosed } = useContext(globalContext);

  if (!buttons) {
    buttons = [
      {
        icon: "draft-fill",
        label: "Nova Análise",
        linkTo: "/analysis/new"
      },
      {
        icon: "file-list-fill",
        label: "Listar Análises",
        linkTo: "/",
        outline: true
      }
    ]
  }
  if (currentUser?.role === "admin") {
    buttons.push({
      icon: "user-fill",
      label: "Usuários",
      linkTo: "/users",
      outline: true
    });
  } else {
    buttons.push({
      icon: "user-fill",
      label: "Meus Dados",
      linkTo: "/users/me",
      outline: true
    });
  }

  const filteredButtons = () => {
    return buttons?.filter(button => button.linkTo !== location.pathname);
  }

  return (<>
    <div className={`template-grid ${isSidebarClosed ? "closed" : null}`}>
      <div className="sidebar relative">
        <button onClick={() => setIsSidebarClosed(!isSidebarClosed)} className='absolute right-0 mr-7 mt-2 text-3xl opacity-50 hover:opacity-100 cursor-pointer'>
          <i className={`${isSidebarClosed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'}`}></i>
        </button>
        <SidebarCard buttons={filteredButtons()} isClosed={isSidebarClosed} />
      </div>
      <div className="content">
        <Greeting />
        {children}
      </div>
    </div>
  </>);
}

export default Sidebar;
