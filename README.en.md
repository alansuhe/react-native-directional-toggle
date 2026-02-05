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
  <b>Multi-Element Toggle Component</b><br/>
  A multi-option toggle switch component for React Native and Expo with support for horizontal and vertical layouts and smooth animations.
</p>

<p align="center">
  English | <a href="./README.md">中文</a>
</p>

---

## ✨ Features

- 🎯 **Multi-Option Support** - Toggle between two or more options
- 📱 **Bidirectional Layout** - Support for horizontal and vertical layouts
- 🎨 **Highly Customizable** - Customize styles, colors, and text styles
- ⚡ **Smooth Animations** - High-performance animations powered by Reanimated
- 👆 **Gesture Support** - Support for tap and swipe gestures
- 🔧 **TypeScript** - Complete TypeScript type support
- 📦 **Lightweight** - Zero dependencies (except peer dependencies)
- 🚀 **Expo Compatible** - Works with Expo projects

## 📦 Installation

### Using npm

```bash
npm install react-native-directional-toggle
```

### Using yarn

```bash
yarn add react-native-directional-toggle
```

### Using pnpm

```bash
pnpm add react-native-directional-toggle
```

### Install Peer Dependencies

This component relies on the following peer dependencies. Please ensure they are installed:

```bash
# npm
npm install react-native-gesture-handler react-native-reanimated react-native-worklets

# yarn
yarn add react-native-gesture-handler react-native-reanimated react-native-worklets

# pnpm
pnpm add react-native-gesture-handler react-native-reanimated react-native-worklets
```

**Note:**

- Expo projects require `expo prebuild` and `expo run`, not supported in Expo Go
- You need to wrap your app with `GestureHandlerRootView`

## 🚀 Usage

### Basic Usage

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
      {/* Horizontal mode: specify width and height */}
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

### Vertical Mode

```tsx
import { View } from 'react-native';

// Vertical mode: adapts to parent container height
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

### Custom Styles

```tsx
<Switcher
  options={[
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
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

## 📖 API Documentation

### Props

| Prop                | Type                                   | Required | Default             | Description                                            |
| ------------------- | -------------------------------------- | -------- | ------------------- | ------------------------------------------------------ |
| `options`           | `Option[]`                             | ✅       | -                   | List of options, each with `label` and `value`         |
| `value`             | `string \| number`                     | ✅       | -                   | Currently selected value                               |
| `onChange`          | `(value: string \| number) => void`    | ✅       | -                   | Callback when value changes                            |
| `vertical`          | `boolean`                              | ❌       | `false`             | Whether to use vertical layout                         |
| `style`             | `StyleProp<ViewStyle>`                 | ❌       | -                   | Container style for width, height, background, etc.    |
| `thumbStyle`        | `StyleProp<ViewStyle>`                 | ❌       | -                   | Style for the sliding thumb (selected item background) |
| `textStyle`         | `StyleProp<TextStyle>`                 | ❌       | -                   | Default style for option text                          |
| `activeTextStyle`   | `StyleProp<TextStyle>`                 | ❌       | -                   | Text style when active/selected                        |
| `inactiveTextStyle` | `StyleProp<TextStyle>`                 | ❌       | -                   | Text style when inactive                               |
| `animationConfig`   | `WithTimingConfig \| WithSpringConfig` | ❌       | `{ duration: 150 }` | Animation configuration                                |

### Type Definitions

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

### Animation Configuration

Customize animations via `animationConfig`:

```tsx
// Using timing animation
<Switcher
  animationConfig={{
    duration: 200, // Animation duration in milliseconds
  }}
/>

// Using spring animation
<Switcher
  animationConfig={{
    damping: 15,    // Damping coefficient
    stiffness: 150, // Stiffness
    mass: 1,        // Mass
  }}
/>
```

## 📱 Example

Check the [example](example/) directory for a complete example project.

```bash
# Clone the repository
git clone https://github.com/alansuhe/react-native-directional-toggle.git

# Navigate to the example directory
cd react-native-directional-toggle/example

# Install dependencies
pnpm install

# Run on iOS
pnpm ios

# Run on Android
pnpm android
```

## 🤝 Contributing

Issues and Pull Requests are welcome!

Please read our [Contributing Guide](./CONTRIBUTING.md) for more information.

## 📄 License

[MIT](./LICENSE) © [Alan Suhe](https://github.com/alansuhe)

---

<p align="center">
  If this project helped you, please give it a ⭐️
</p>
