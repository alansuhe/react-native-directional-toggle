# Description

This is a React Native / Expo component library.

Note: expo development can only run normally with `expo run` after prebuild, not supported by `expo go`.

For Chinese version, please click: [中文](README.md).

## Installation

```bash
pnpm add react-native-directional-toggle

yarn add react-native-directional-toggle
```

## Peer Dependencies

```bash
pnpm add react-native-gesture-handler react-native-reanimated react-native-worklets --save-peer
```

Dependencies required:
- react-native-gesture-handler
- react-native-reanimated
- react-native-worklets

Note: Only works with `expo run` after prebuild, not supported by `expo go`.

## Usage

> Refer to the [example project](example/).

### Import and use
```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Switcher from 'react-native-directional-toggle';

const options = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3' },
];

...

<GestureHandlerRootView style={{ flex: 1 }}>
    {/* Horizontal: Fixed Width & Height */}
    <Switcher
        options={options}
        value={'Option 2'}
        onChange={value => console.log(value)}
        style={{ width: 300, height: 40, backgroundColor: '#f2f2f2' }}
        thumbStyle={{ backgroundColor: '#fff', elevation: 3 }}
    />

    {/* Vertical: Adapt to Parent Height */}
    <View style={{ height: 200, width: 60 }}>
        <Switcher
            vertical
            options={options}
            value={'Option 2'}
            onChange={value => console.log(value)}
            style={{ flex: 1 }} 
        />
    </View>
</GestureHandlerRootView>
```

Note: You need to wrap the outer layer of your App (such as _layout.tsx, etc.) with `GestureHandlerRootView`.

## Parameters

The type of props:

```ts
type AnimatedSwitchProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  // Direction
  vertical?: boolean; 
  // Container Style (Set width/height here)
  style?: StyleProp<ViewStyle>;
  // Thumb Style
  thumbStyle?: StyleProp<ViewStyle>;
  // Default Text Style
  textStyle?: StyleProp<TextStyle>;
  // Active Text Style
  activeTextStyle?: StyleProp<TextStyle>;
  // Inactive Text Style
  inactiveTextStyle?: StyleProp<TextStyle>;
  // Animation Config
  animationConfig?: WithTimingConfig | WithSpringConfig;
};
```
