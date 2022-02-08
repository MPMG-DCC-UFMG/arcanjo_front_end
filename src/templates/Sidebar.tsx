import React, { ReactChild } from 'react';
import Greeting from '../components/Greeting';
import SidebarCard, { SidebarButton } from '../components/SidebarCard';


interface SidebarProps {
  children: ReactChild,
  buttons?: SidebarButton[]
}

function Sidebar({ buttons, children }: SidebarProps) {

  if (!buttons)
    buttons = [
      {
        label: "Nova Análise",
        linkTo: "/analysis/new"
      },
      {
        label: "Usuários",
        linkTo: "/users"
      }
    ]

  return (<>
    <div className='grid'>
      <div className="sidebar">
        <SidebarCard buttons={buttons} />
      </div>
      <div className="content">
        <Greeting />
        {children}
      </div>
    </div>
  </>);
}

export default Sidebar;
