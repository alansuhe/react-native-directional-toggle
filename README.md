# 说明

这是一个 React Native / Expo 组件库。

For English version, please click: [English](README.en.md)。

## 安装

```bash
pnpm add react-native-directional-toggle

yarn add react-native-directional-toggle
```

## 依赖包

```bash
pnpm add react-native-gesture-handler react-native-reanimated react-native-worklets --save-peer
```

需要安装的依赖包：
- react-native-gesture-handler
- react-native-reanimated
- react-native-worklets

## 使用

> 参考[示例项目](example/)。

###  导入组件使用

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
注意: App中需要在外层（如_layout.tsx等）包裹GestureHandlerRootView。