import React, { ReactChild, useContext } from 'react';
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
  const { currentUser } = useContext(globalContext);

  if (!buttons) {
    buttons = [
      {
        label: "Nova Análise",
        linkTo: "/analysis/new"
      },
      {
        label: "Listar Análises",
        linkTo: "/",
        outline: true
      }
    ]
  }
  if (currentUser?.role === "admin") {
    buttons.push({
      label: "Usuários",
      linkTo: "/users",
      outline: true
    });
  }

  const filteredButtons = () => {
    return buttons?.filter(button => button.linkTo !== location.pathname);
  }

  return (<>
    <div className='grid'>
      <div className="sidebar">
        <SidebarCard buttons={filteredButtons()} />
      </div>
      <div className="content">
        <Greeting />
        {children}
      </div>
    </div>
  </>);
}

export default Sidebar;
