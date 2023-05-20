"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const ReactQueryProviders = ({ children }) => {
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 5000,
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
};
