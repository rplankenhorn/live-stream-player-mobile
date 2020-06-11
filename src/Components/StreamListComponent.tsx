import React, { SFC, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import { fetchStreams } from '../Api/Api';
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

const ListItem: SFC<ListItemProps> = ({ id, title, selected, onSelect }) => {
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

interface StreamListComponentProps {
  onStreamSelected: (stream: Stream) => void,
}

const StreamListComponent = (props: StreamListComponentProps) => {
  const [selected, setSelected] = React.useState(undefined);

  const { streams, loading } = fetchStreams();

  const onSelect = useCallback(
    id => {
      setSelected(id);
      const selectedStream = streams?.filter(s => s.id === id)[0]
      if (selectedStream) {
        props.onStreamSelected(selectedStream)
      }
    },
    [streams, selected],
  );

  if (loading) {
    return (
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    )
  }
  return (
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
  )
};

const styles = StyleSheet.create({
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
  }
});

export default StreamListComponent;