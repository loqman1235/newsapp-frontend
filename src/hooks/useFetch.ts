import api from "@/services/api";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetch = (url: string): { data: any; isLoading: boolean } => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (error.code === "ERR_NETWORK") {
            toast.error(
              "Unable to connect to the server! Please check your internet connection and try again later.",
            );
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default useFetch;
