"use client"

import { QueryClient, QueryClientProvider } from "react-query";

export const Providers = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    )
};