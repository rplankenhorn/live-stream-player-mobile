import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Video from 'react-native-video';

import { Stream } from '../Api/ApiTypes';

interface VideoPlayerComponentProps {
  selectedStream: Stream | undefined
};

const VideoPlayerComponent = (props: VideoPlayerComponentProps) => {
  const { selectedStream } = props;

  return (
    <View style={styles.container}>
      {
        selectedStream &&
        <Video
          key={selectedStream.id}
          source={{ uri: selectedStream.url }}
          style={styles.videoPlayer}
          controls
          fullscreenOrientation={"landscape"}
          resizeMode={"contain"}
        />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '40%'
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayerComponent;