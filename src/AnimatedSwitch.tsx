import { useCallback, useEffect, useMemo } from 'react';
import {
  type LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type WithSpringConfig,
  type WithTimingConfig,
  type SharedValue,
} from 'react-native-reanimated';

type Option = {
  label: string;
  value: string | number;
};

export type AnimatedSwitchProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  /**
   * Direction of the switch.
   * @default false (Horizontal)
   */
  vertical?: boolean;
  /**
   * Container style. Use this to set width/height.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the moving thumb.
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * Base style for option text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Style for the text when active.
   */
  activeTextStyle?: StyleProp<TextStyle>;
  /**
   * Style for the text when inactive.
   */
  inactiveTextStyle?: StyleProp<TextStyle>;
  /**
   * Animation configuration.
   */
  animationConfig?: WithTimingConfig | WithSpringConfig;
  /**
   * When true, the switch does not respond to interactions.
   * @default false
   */
  disabled?: boolean;
};

const DEFAULT_ANIMATION = {
  duration: 150,
  damping: 5,
  stiffness: 100,
};

export function AnimatedSwitch({
  options,
  value,
  onChange,
  vertical = false,
  style,
  thumbStyle,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,
  animationConfig = DEFAULT_ANIMATION,
  disabled = false,
}: AnimatedSwitchProps) {
  console.log('disabled ---->', disabled);
  const itemSizeSV = useSharedValue(0);
  const translate = useSharedValue(0);
  const indexSV = useSharedValue(0);

  const currentIndex = options.findIndex((o) => o.value === value);

  // Measure container layout
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;

      const totalSize = vertical ? height - 4 : width - 4;
      const itemSize = totalSize / options.length;
      itemSizeSV.value = itemSize;

      // Fix initial position on layout
      if (currentIndex >= 0 && itemSize > 0) {
        translate.value = currentIndex * itemSize;
      }
    },
    [vertical, options.length, currentIndex, itemSizeSV, translate]
  );

  // Sync with external value changes
  useEffect(() => {
    if (currentIndex >= 0 && itemSizeSV.value > 0) {
      indexSV.value = currentIndex;
      translate.value = withTiming(
        currentIndex * itemSizeSV.value,
        animationConfig as WithTimingConfig
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, animationConfig]);

  const emitChange = useCallback(
    (index: number) => {
      // Clamp index to safe bounds
      const safeIndex = Math.max(0, Math.min(index, options.length - 1));
      if (options[safeIndex]) {
        onChange(options[safeIndex].value);
      }
    },
    [onChange, options]
  );

  const handlePress = (index: number) => {
    if (disabled || itemSizeSV.value === 0) return;
    translate.value = withTiming(
      index * itemSizeSV.value,
      animationConfig as WithTimingConfig
    );
    emitChange(index);
  };

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!disabled)
        .onUpdate((e) => {
          if (itemSizeSV.value === 0) return;
          const term = vertical ? e.translationY : e.translationX;
          const startPos = indexSV.value * itemSizeSV.value;
          const pos = startPos + term;
          const max = (options.length - 1) * itemSizeSV.value;
          translate.value = Math.min(Math.max(0, pos), max);
        })
        .onEnd(() => {
          if (itemSizeSV.value === 0) return;
          const index = Math.round(translate.value / itemSizeSV.value);
          indexSV.value = index;
          translate.value = withSpring(
            index * itemSizeSV.value,
            animationConfig as WithSpringConfig
          );
          scheduleOnRN(emitChange, index);
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );

  const animatedThumbStyle = useAnimatedStyle(() => {
    // If layout not ready, hide thumb or show nothing
    if (itemSizeSV.value === 0) return { opacity: 0 };

    const transform = vertical
      ? [{ translateY: translate.value }]
      : [{ translateX: translate.value }];

    const sizeStyle = vertical
      ? { height: itemSizeSV.value, width: '100%' }
      : { width: itemSizeSV.value, height: '100%' };

    return {
      position: 'absolute',
      left: 2,
      top: 2,
      ...sizeStyle,
      transform,
      opacity: 1,
    };
  });

  const content = (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        vertical ? styles.vertical : styles.horizontal,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Animated.View style={[styles.thumb, thumbStyle, animatedThumbStyle]} />

      {options.map((opt, index) => (
        <OptionItem
          key={String(opt.value)}
          label={opt.label}
          onPress={() => handlePress(index)}
          index={index}
          translate={translate}
          itemSizeSV={itemSizeSV}
          textStyle={textStyle}
          activeTextStyle={activeTextStyle}
          inactiveTextStyle={inactiveTextStyle}
          disabled={disabled}
        />
      ))}
    </View>
  );

  // disabled 时不挂载 GestureDetector
  return disabled ? (
    content
  ) : (
    <GestureDetector gesture={panGesture}>{content}</GestureDetector>
  );
}

// Sub-component for individual options to isolate animated styles
const OptionItem = ({
  label,
  onPress,
  index,
  translate,
  itemSizeSV,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,
  disabled,
}: {
  label: string;
  onPress: () => void;
  index: number;
  translate: SharedValue<number>;
  itemSizeSV: SharedValue<number>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}) => {
  const activeColor =
    (StyleSheet.flatten(activeTextStyle)?.color as string) ?? '#000';
  const inactiveColor =
    (StyleSheet.flatten(inactiveTextStyle)?.color as string) ?? '#999';

  const textAnimatedStyle = useAnimatedStyle(() => {
    const center = index * itemSizeSV.value;
    const color = interpolateColor(
      translate.value,
      [center - itemSizeSV.value, center, center + itemSizeSV.value],
      [inactiveColor, activeColor, inactiveColor]
    );
    return { color };
  });

  return (
    <Pressable style={styles.option} onPress={onPress} disabled={disabled}>
      <Animated.Text
        style={[styles.text, textStyle, textAnimatedStyle]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 2,
    position: 'relative',
  },
  disabled: {
    opacity: 0.5,
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  thumb: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 1
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
