import { useEffect, useState } from "react";

type FetchError = {
  status: number;
  message: string;
};

type ResType = {
  ok: boolean;
  status: number;
};

const useFetch = (url: string) => {
  const [response, setResponse] = useState({ name: "", code: "" });
  const [error, setError] = useState<FetchError>();
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState<ResType | undefined>();
  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      setIsLoading(true);
      fetch(url)
        .then((res) => {
          setRes({ ok: res.ok, status: res.status });
          res.json();
        })
        .then((json: any) => {
          if (mounted && res && res.ok) {
            setResponse(json);
            setIsLoading(false);
          } else if (res && res.ok === false) {
            setError({
              status: res.status,
              message:
                res.status === 404 ? "Not found" : `Error status ${res.status}`,
            });
          }
        })
        .catch(() => setError({ status: 500, message: "Network error" }));
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
