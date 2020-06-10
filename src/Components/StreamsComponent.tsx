import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

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

  return (
    <>
      <View style={styles.streamContainer}>

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
    backgroundColor: 'blue',
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

  }
});

export default StreamsComponent;
