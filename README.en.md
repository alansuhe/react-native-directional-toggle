# Description

This is a React Native / Expo component library.

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

...

<GestureHandlerRootView>
    <Switcher
            options={options}
            value={'Option 2'}
            height={36}
            onChange={value => console.log(value)}
    />
</GestureHandlerRootView>

```
Note: You need to wrap the outer layer of your App (such as _layout.tsx, etc.) with `GestureHandlerRootView`.
