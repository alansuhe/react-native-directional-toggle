# 说明

这是一个 React Native / Expo 组件库。

注意：expo开发时，只能在prebuild后正常用`expo run`的方式运行，不支持expo go。

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

## 参数
组件参数类型如下：

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

默认值：
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