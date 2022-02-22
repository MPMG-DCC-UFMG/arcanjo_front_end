import React, { ReactChild, useState } from 'react'
import { GlobalStateInterface, UserData } from '../types/types';

const initialValue: GlobalStateInterface = {
    currentUser: null,
    setCurrentUser: () => { },
    isSidebarClosed: false,
    setIsSidebarClosed: () => { }
};

export const globalContext = React.createContext(initialValue);

function GlobalContext({ children }: { children: ReactChild }) {

    const [currentUser, setCurrentUser] = useState<UserData | null>();
    const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false);

    return (
        <globalContext.Provider value={{
            currentUser, setCurrentUser,
            isSidebarClosed, setIsSidebarClosed
        }}>
            {children}
        </globalContext.Provider>
    )
}

export default GlobalContext
