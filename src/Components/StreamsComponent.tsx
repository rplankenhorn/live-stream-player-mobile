import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';

import { Api } from '../Api/Api';
import { Stream } from '../Api/ApiTypes';

interface ListItemProps {
  id: string,
  title: string,
  selected: boolean,
  onSelect: Function
};

const ListItemHeader = () => {
  return (
    <View style={styles.listHeaderContainer}>
      <Text
        style={styles.listHeader}
      >
        Streams
        </Text>
    </View>
  );
};

const ListItemSeparator = () => {
  return (
    <View
      style={styles.listItemSeparator}
    />
  );
};

const ListItem: React.SFC<ListItemProps> = ({ id, title, selected, onSelect }) => {
  const imageAsset = selected ? require('../Assets/play_white.png') : require('../Assets/play_green.png');

  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.listItem,
        { backgroundColor: selected ? 'rgb(115,191,85)' : 'white' },
      ]}
    >
      <Text style={{ color: selected ? 'white' : 'rgb(79,79,79)', ...styles.title }}>{title}</Text>
      <Image style={styles.playButton} source={imageAsset} />
    </TouchableOpacity>
  );
};

const ListEmptyComponent = () => {
  return (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyText}>No streams available.</Text>
    </View>
  );
}

const StreamsComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [streams, setStreams] = useState<[Stream] | undefined>(undefined);
  const [selected, setSelected] = React.useState(undefined);

  useEffect(() => {
    Api.getStreams()
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

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    )
  }

  const selectedStream = streams?.filter(s => s.id === selected)[0]

  return (
    <>
      <View style={styles.streamContainer}>
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
      <FlatList
        data={streams}
        ListHeaderComponent={ListItemHeader}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            id={item.id}
            title={item.title}
            selected={selected === item.id}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item, index) => item.id}
        extraData={selected}
        ListEmptyComponent={ListEmptyComponent}
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
  listHeaderContainer: {
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  listHeader: {
    marginLeft: 10,
    fontSize: 20,
    color: 'rgb(84, 129, 210)'
  },
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  listEmptyText: {
    fontSize: 15,
    color: 'red',
  },
  listItem: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemSeparator: {
    height: 1,
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#000",
  },
  title: {
    flex: 1,
    marginLeft: 10
  },
  playButton: {
    height: 20,
    width: 20,
    marginRight: 20
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
