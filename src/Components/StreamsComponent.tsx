import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';

import StreamListComponent from './StreamListComponent';
import VideoPlayerComponent from './VideoPlayerComponent';

import { Stream } from '../Api/ApiTypes';

const StreamsComponent = () => {
  // if (loading) {
  //   return (
  //     <Spinner
  //       visible={loading}
  //       textContent={'Loading...'}
  //       textStyle={styles.spinnerTextStyle}
  //     />
  //   )
  // }

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

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  }
});

export default StreamsComponent;
