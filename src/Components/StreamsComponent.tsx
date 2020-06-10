import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';

import { getStreams } from '../Api/Api';
import { Stream } from '../Api/ApiTypes';

interface ListItemProps {
  id: string,
  title: string,
  selected: boolean,
  onSelect: Function
};

const StreamsComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [streams, setStreams] = useState<[Stream] | undefined>(undefined);
  const [selected, setSelected] = React.useState(undefined);

  useEffect(() => {
    getStreams()
      .then((streams) => setStreams(streams))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const onSelect = React.useCallback(
    id => {
      setSelected(id);
    },
    [selected],
  );

  const ListItem: React.SFC<ListItemProps> = ({ id, title, selected, onSelect }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.listItem,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    )
  }

  const selectedStream = streams?.filter(s => s.title === selected)[0]

  return (
    <>
      <View style={styles.streamContainer}>
        {
          selectedStream &&
          <Video
            source={{ uri: selectedStream.url }}
            style={styles.videoPlayer}
            controls
            fullscreenOrientation={"landscape"}
          />
        }
      </View>
      <View style={styles.listHeader}>
        <Text>Streams</Text>
      </View>
      <FlatList
        data={streams}
        renderItem={({ item }) => (
          <ListItem
            id={item.title}
            title={item.title}
            selected={selected === item.title}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item, index) => item.title}
        extraData={selected}
      />
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  streamContainer: {
    backgroundColor: 'black',
    height: '40%'
  },
  listHeader: {
    justifyContent: 'center',
    height: 50,
    marginLeft: 10
  },
  listItem: {

  },
  title: {

  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default StreamsComponent;
