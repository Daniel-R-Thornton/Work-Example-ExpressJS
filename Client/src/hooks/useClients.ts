import { Client } from "../api/types";
import { fetchClient } from "../api/fetchClients";
import { useEffect, useState, useCallback } from "react";

export default function useClients() {
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [refetch, setRefetch] = useState<number>(0);

  //set the refetch to a random number so that the component re-renders
  const invalidate = useCallback(() => setRefetch(Math.random()), []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsLoading(true);

    fetchClient(signal)
      .then((response) => {
        setClients(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort("aborting");
    };
  }, [refetch]);

  return { clients, isLoading, error, invalidate };
}
