"use client";

import { useState, useContext, createContext } from "react";

const Context = createContext({} as TRefreshContext);

type TRefreshContext = {
    refresh: number;
    setRefresh: React.Dispatch<
        React.SetStateAction<TRefreshContext["refresh"]>
    >;
};

export function useRefresh() {
    return useContext(Context);
}

export function RefreshProvider({ children }: { children: React.ReactNode }) {
    const [refresh, setRefresh] = useState(0);
    return (
        <Context.Provider value={{ refresh, setRefresh }}>
            {children}
        </Context.Provider>
    );
}
