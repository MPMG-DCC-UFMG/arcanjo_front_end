import React, { ReactChild, useState } from 'react'
import { GlobalStateInterface, UserData } from '../types/types';

const initialValue: GlobalStateInterface = {
    currentUser: null,
    setCurrentUser: () => { }
};

export const globalContext = React.createContext(initialValue);

function GlobalContext({ children }: { children: ReactChild }) {

    const [currentUser, setCurrentUser] = useState<UserData | null>();

    return (
        <globalContext.Provider value={{
            currentUser, setCurrentUser
        }}>
            {children}
        </globalContext.Provider>
    )
}

export default GlobalContext
