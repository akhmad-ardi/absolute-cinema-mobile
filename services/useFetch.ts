import React from "react";

export default function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch = true) {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    async function fetchData() {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            setData(result);
        } catch (error) {
            setError(error instanceof Error ? error: new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    }

    function reset() {
        setData(null);
        setError(null);
        setLoading(false);
    }

    React.useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, []);

    return { data, loading, error, refetch: fetchData, reset }
}