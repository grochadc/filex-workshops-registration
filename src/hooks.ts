import { useEffect, useState } from "react";

type FetchError = {
  status: number;
  message: string;
};

const useFetch = (url: string) => {
  const [response, setResponse] = useState({ name: "", code: "" });
  const [error, setError] = useState<FetchError>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (mounted && res.ok) {
          setResponse(json);
          setIsLoading(false);
        } else if (!res.ok) {
          setError({
            status: res.status,
            message:
              res.status === 404 ? "Not found" : `Error status ${res.status}`,
          });
        }
      } catch (error) {
        setError({ status: 500, message: "Network error" });
      }
    };
    fetchData();
    function callback() {
      mounted = false;
    }
    return callback;
  }, [url]);
  return { response, error, isLoading };
};

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return { showModal, handleCloseModal, handleShowModal };
};

export { useFetch, useModal };
