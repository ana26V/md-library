import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useFetchData<TData>(
    fetcher: () => Promise<AxiosResponse<TData, any>>,
    deps: any[] = [],
    initialData?: TData
) {
    const [data, setData] = useState<TData | undefined>(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const fetchData = () => {
        setLoading(true);
        setError(undefined);

        fetcher()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, deps);

    return {
        data,
        loading,
        error,
        refetchData: fetchData,
    };
}
