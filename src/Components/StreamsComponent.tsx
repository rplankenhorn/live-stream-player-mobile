import React, { useCallback, useState } from 'react';

import StreamListComponent from './StreamListComponent';
import VideoPlayerComponent from './VideoPlayerComponent';

import { Stream } from '../Api/ApiTypes';

const StreamsComponent = () => {
  const [selectedStream, setSelectedStream] = useState<Stream>();

  const onStreamSelected = useCallback(
    (stream: Stream) => {
      setSelectedStream(stream);
    },
    [selectedStream],
  );

  return (
    <>
      <VideoPlayerComponent
        selectedStream={selectedStream}
      />
      <StreamListComponent
        onStreamSelected={onStreamSelected}
      />
    </>
  );
};

export default StreamsComponent;
