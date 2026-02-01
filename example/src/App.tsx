import { View, StyleSheet, Text } from 'react-native';
import Switcher from 'react-native-directional-toggle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';

const options = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3' },
];

export default function App() {
  const [val1, setVal1] = useState('Option 2');
  const [val2, setVal2] = useState('Option 2');

  return (
    <GestureHandlerRootView style={styles.root}>
      <>
        <Text style={styles.header}>Horizontal: {val1}</Text>
        <Switcher
          options={options}
          value={val1}
          onChange={(v) => setVal1(v as string)}
          style={styles.horizontalSwitch}
          thumbStyle={styles.thumb}
          activeTextStyle={styles.activeText}
        />

        <Text style={styles.header}>Vertical: {val2}</Text>
        <View style={styles.verticalContainer}>
          <Switcher
            options={options}
            vertical
            value={val2}
            onChange={(v) => setVal2(v as string)}
            style={styles.verticalSwitch}
            thumbStyle={styles.thumb}
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
          />
        </View>
      </>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  horizontalSwitch: {
    // width: 300,
    height: 40,
    backgroundColor: '#f2f2f2',
  },
  verticalContainer: {
    // borderWidth: 1,
    // flex: 1,
    height: 124,
    width: 100,
    borderColor: '#473838',
  },
  verticalSwitch: {
    flex: 1, // Adapts to parent height
    backgroundColor: '#f2f2f2',
  },
  thumb: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    color: '#999',
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
