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

## Parameters
The type of props:

```ts
type Props = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  height?: number;
  vertical?: boolean; // 纵向布局
  colors?: {
    activeText: string;
    inactiveText: string;
    bgFront: string;
    bgBack: string;
  };
  animationConfig?: {
    duration?: number;
    damping?: number;
    stiffness?: number;
  };
};

```

Default parameters:
```ts
{
  options,
  value,
  onChange,
  height = 36,
  vertical = false,
  colors = {
    activeText: "#373737",
    inactiveText: "#dededeff",
    bgFront: "#d4d4d4",
    bgBack: "#9a9a9a",
  },
  animationConfig = {
    duration: 100,
    damping: 50,
    stiffness: 200,
  },
}
```
