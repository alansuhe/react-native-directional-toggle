# react-native-directional-toggle

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-directional-toggle">
    <img src="https://img.shields.io/npm/v/react-native-directional-toggle.svg?style=for-the-badge" alt="NPM Version" />
  </a>
  <a href="https://github.com/alansuhe/react-native-directional-toggle/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/alansuhe/react-native-directional-toggle/ci.yml?branch=main&style=for-the-badge" alt="CI Status" />
  </a>
  <a href="https://github.com/alansuhe/react-native-directional-toggle/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/react-native-directional-toggle.svg?style=for-the-badge" alt="License" />
  </a>
  <a href="https://www.npmjs.com/package/react-native-directional-toggle">
    <img src="https://img.shields.io/npm/dm/react-native-directional-toggle.svg?style=for-the-badge" alt="NPM Downloads" />
  </a>
</p>

<p align="center">
  <b>多元素切换组件</b><br/>
  支持 React Native 和 Expo 的多选项切换开关组件，支持横向和纵向布局及流畅动画。
</p>

<p align="center">
  <a href="./README.en.md">English</a> | 中文
</p>

---

## ✨ 特性

- 🎯 **多选项支持** - 支持两个或更多选项的切换
- 📱 **双方向布局** - 支持横向（horizontal）和纵向（vertical）布局
- 🎨 **高度可定制** - 自定义样式、颜色、文字样式
- ⚡ **流畅动画** - 基于 Reanimated 的高性能动画
- 👆 **手势支持** - 支持点击和滑动手势
- 🔧 **TypeScript** - 完整的 TypeScript 类型支持
- 📦 **轻量级** - 零依赖（peer dependencies 除外）
- 🚀 **Expo 支持** - 兼容 Expo 项目

## 📦 安装

### 使用 npm

```bash
npm install react-native-directional-toggle
```

### 使用 yarn

```bash
yarn add react-native-directional-toggle
```

### 使用 pnpm

```bash
pnpm add react-native-directional-toggle
```

### 安装 peer dependencies

本组件依赖以下 peer dependencies，请确保已安装：

```bash
# npm
npm install react-native-gesture-handler react-native-reanimated react-native-worklets

# yarn
yarn add react-native-gesture-handler react-native-reanimated react-native-worklets

# pnpm
pnpm add react-native-gesture-handler react-native-reanimated react-native-worklets
```

**注意：**

- Expo 项目需要使用 `expo prebuild` 后通过 `expo run` 运行，不支持 Expo Go
- 需要在应用外层包裹 `GestureHandlerRootView`

## 🚀 使用

### 基础用法

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Switcher from 'react-native-directional-toggle';

const options = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3' },
];

function App() {
  const [value, setValue] = useState('Option 2');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 横向模式：指定宽度和高度 */}
      <Switcher
        options={options}
        value={value}
        onChange={setValue}
        style={{ width: 300, height: 40, backgroundColor: '#f2f2f2' }}
        thumbStyle={{ backgroundColor: '#fff', elevation: 3 }}
      />
    </GestureHandlerRootView>
  );
}
```

### 纵向模式

```tsx
import { View } from 'react-native';

// 纵向模式：自适应父容器高度
<View style={{ height: 200, width: 60 }}>
  <Switcher
    vertical
    options={options}
    value={value}
    onChange={setValue}
    style={{ flex: 1 }}
  />
</View>;
```

### 自定义样式

```tsx
<Switcher
  options={[
    { label: '日', value: 'day' },
    { label: '周', value: 'week' },
    { label: '月', value: 'month' },
  ]}
  value={value}
  onChange={setValue}
  style={{
    width: 240,
    height: 44,
    backgroundColor: '#e8e8e8',
    borderRadius: 22,
    padding: 3,
  }}
  thumbStyle={{
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }}
  textStyle={{
    fontSize: 14,
    fontWeight: '600',
  }}
  activeTextStyle={{
    color: '#007AFF',
  }}
  inactiveTextStyle={{
    color: '#666',
  }}
/>
```

## 📖 API 文档

### Props

| 属性                | 类型                                   | 必填 | 默认值              | 描述                                      |
| ------------------- | -------------------------------------- | ---- | ------------------- | ----------------------------------------- |
| `options`           | `Option[]`                             | ✅   | -                   | 选项列表，每个选项包含 `label` 和 `value` |
| `value`             | `string \| number`                     | ✅   | -                   | 当前选中的值                              |
| `onChange`          | `(value: string \| number) => void`    | ✅   | -                   | 值改变时的回调函数                        |
| `vertical`          | `boolean`                              | ❌   | `false`             | 是否为纵向布局                            |
| `style`             | `StyleProp<ViewStyle>`                 | ❌   | -                   | 容器样式，用于设置宽度、高度、背景色等    |
| `thumbStyle`        | `StyleProp<ViewStyle>`                 | ❌   | -                   | 滑块（选中项背景）样式                    |
| `textStyle`         | `StyleProp<TextStyle>`                 | ❌   | -                   | 选项文字的默认样式                        |
| `activeTextStyle`   | `StyleProp<TextStyle>`                 | ❌   | -                   | 选中状态的文字样式                        |
| `inactiveTextStyle` | `StyleProp<TextStyle>`                 | ❌   | -                   | 未选中状态的文字样式                      |
| `animationConfig`   | `WithTimingConfig \| WithSpringConfig` | ❌   | `{ duration: 150 }` | 动画配置                                  |

### 类型定义

```typescript
type Option = {
  label: string;
  value: string | number;
};

type AnimatedSwitchProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
  animationConfig?: WithTimingConfig | WithSpringConfig;
};
```

### 动画配置

可以通过 `animationConfig` 自定义动画效果：

```tsx
// 使用 timing 动画
<Switcher
  animationConfig={{
    duration: 200, // 动画时长（毫秒）
  }}
/>

// 使用 spring 动画
<Switcher
  animationConfig={{
    damping: 15,    // 阻尼系数
    stiffness: 150, // 刚度
    mass: 1,        // 质量
  }}
/>
```

## 📱 示例

查看 [example](example/) 目录获取完整的示例项目。

```bash
# 克隆仓库
git clone https://github.com/alansuhe/react-native-directional-toggle.git

# 进入示例目录
cd react-native-directional-toggle/example

# 安装依赖
pnpm install

# 运行 iOS
pnpm ios

# 运行 Android
pnpm android
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

请阅读我们的[贡献指南](./CONTRIBUTING.md)了解详细信息。

## 📄 许可证

[MIT](./LICENSE) © [Alan Suhe](https://github.com/alansuhe)

---

<p align="center">
  如果这个项目对您有帮助，请给它一个 ⭐️
</p>
