import { FundingSource } from "../api/types";
import { fetchFundingSource } from "../api/fetchFundingSource";
import { useEffect, useState } from "react";

export default function useFundingSources() {
  const [isLoading, setIsLoading] = useState(false);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // Start the asynchronous operation
    fetchFundingSource(signal)
      .then((response) => {
        setFundingSources(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort("aborting");
    };
  }, []);

  return { fundingSources, isLoading, error };
}
