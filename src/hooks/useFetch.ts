import api from "@/services/api";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useFetch = (
  url: string,
  slug?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { data: any; isLoading: boolean } => {
  const [data, setData] = useState([] || {});
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (slug) {
          response = await api.get(`${url}/${slug}`);
        } else {
          response = await api.get(url);
        }

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
  }, [url, slug]);

  return { data, isLoading };
};

export default useFetch;
