import { Stream } from './ApiTypes';

const getStreams = async () => {
  try {
    const response = await fetch('https://api.jsonbin.io/b/5e90bec48e85c8437013eda1');
    const json = await response.json();
    const streams: [Stream] = json.streams;
    return streams;
  } catch (error) {
    console.error(error);
  }
}

export {
  getStreams
};