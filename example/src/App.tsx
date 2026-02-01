import { View, StyleSheet } from 'react-native';
import Switcher from 'react-native-directional-toggle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const options = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
];

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Switcher
            options={options}
            value={'Option 2'}
            height={36}
            onChange={(value) => console.log(value)}
          />
        </View>
        <View style={{ height: 120 }}>
          <Switcher
            options={options}
            vertical
            value={'Option 2'}
            onChange={(value) => console.log(value)}
            height={20}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
});
