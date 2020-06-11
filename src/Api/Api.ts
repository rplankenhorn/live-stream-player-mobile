import { useState, useEffect } from 'react';

import { Stream, StreamResponse } from './ApiTypes';

const useFetch = (url: RequestInfo, options?: RequestInit) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  return { response, error, loading };
};

function fetchStreams() {
  const [streams, setStreams] = useState<[Stream] | undefined>()

  const { response, error, loading } = useFetch('https://api.jsonbin.io/b/5e90bec48e85c8437013eda1');

  useEffect(() => {
    if (!loading && !error) {
      const parseStreams = async () => {
        const streams: [Stream] = response.streams.map((item: StreamResponse) => ({
          id: `${Math.floor(Math.random() * 10000)}`, // Ideally, this would come back from the server
          url: item.url,
          title: item.title
        }));
        setStreams(streams)
      }

      parseStreams()
    }
  }, [response, error, loading]);

  return { streams, error, loading };
}

export {
  fetchStreams
}
