import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) =>
                error?.response?.status !== 401 && failureCount < 1,
        },
    },
});

export default queryClient;
