import { Stream, StreamResponse } from './ApiTypes';

const getStreams = async () => {
  try {
    const response = await fetch('https://api.jsonbin.io/b/5e90bec48e85c8437013eda1');
    const json = await response.json();
    const streams: [Stream] = json.streams.map((item: StreamResponse) => {
      return {
        id: `${Math.floor(Math.random() * 10000)}`, // Ideally, this would come back from the server
        url: item.url,
        title: item.title
      }
    });
    return streams;
  } catch (error) {
    console.error(error);
  }
}

export {
  getStreams
};