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
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3' },
];

...

<GestureHandlerRootView style={{ flex: 1 }}>
    {/* 横向模式：指定宽度和高度 */}
    <Switcher
        options={options}
        value={'Option 2'}
        onChange={value => console.log(value)}
        style={{ width: 300, height: 40, backgroundColor: '#f2f2f2' }}
        thumbStyle={{ backgroundColor: '#fff', elevation: 3 }}
    />

    {/* 纵向模式：自适应父容器高度 */}
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

注意: App中需要在外层（如_layout.tsx等）包裹GestureHandlerRootView。

## 参数

组件参数类型如下：

```ts
type AnimatedSwitchProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  // 布局方向
  vertical?: boolean; 
  // 容器样式 (宽度/高度在此设置)
  style?: StyleProp<ViewStyle>;
  // 滑块样式
  thumbStyle?: StyleProp<ViewStyle>;
  // 选项文字默认样式
  textStyle?: StyleProp<TextStyle>;
  // 选中状态文字样式
  activeTextStyle?: StyleProp<TextStyle>;
  // 未选中状态文字样式
  inactiveTextStyle?: StyleProp<TextStyle>;
  // 动画配置
  animationConfig?: WithTimingConfig | WithSpringConfig;
};
```