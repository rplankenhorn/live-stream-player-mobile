interface StreamResponse {
  url: string,
  title: string,
}

interface Stream {
  id: string,
  url: string,
  title: string,
}

export type { Stream, StreamResponse };