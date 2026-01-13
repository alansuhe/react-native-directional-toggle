import { useCallback, useEffect } from "react";
import { type LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  height?: number;
  vertical?: boolean;
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

const THUMB_INSET = 4;
const VERTICAL_WIDTH = 128;

export function AnimatedSwitch({
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
}: Props) {

  /** ===== SharedValues ===== */
  const itemSizeSV = useSharedValue(0);
  const translate = useSharedValue(0);
  const indexSV = useSharedValue(0);

  const currentIndex = options.findIndex((o) => o.value === value);

  /** * 1. 监听外部 value 变化
   * 当外部修改 value 时，滑块应动画移动到新位置
   */
  useEffect(() => {
    if (currentIndex >= 0) {
      indexSV.value = currentIndex;
      // 只有当 itemSizeSV 已经有值（即 Layout 已完成）时才执行动画
      if (itemSizeSV.value > 0) {
        translate.value = withTiming(currentIndex * itemSizeSV.value, {
          duration: animationConfig.duration,
        });
      }
    }
  }, [currentIndex, animationConfig.duration]);

  /** ===== JS 回调 ===== */
  const emitChange = useCallback(
    (index: number) => {
      if (options.length > 0 && index >= 0 && index < options.length) {
        onChange(options[index]?.value || "");
      }
    },
    [onChange, options],
  );

  /** ===== Tap 点击切换 ===== */
  const handlePress = (index: number) => {
    indexSV.value = index;
    translate.value = withTiming(index * itemSizeSV.value, {
      duration: animationConfig.duration ?? 150
    });
    emitChange(index);
  };

  /** ===== Drag 手势 ===== */
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const delta = vertical ? e.translationY : e.translationX;
      // 基于手势开始时的位置进行偏移计算
      const pos = delta + indexSV.value * itemSizeSV.value;
      const max = (options.length - 1) * itemSizeSV.value;

      translate.value = Math.min(Math.max(0, pos), max);
    })
    .onEnd(() => {
      const index = Math.round(translate.value / itemSizeSV.value);
      indexSV.value = index;

      translate.value = withSpring(index * itemSizeSV.value, {
        damping: animationConfig.damping ?? 20,
        stiffness: animationConfig.stiffness ?? 200,
      });

      runOnJS(emitChange)(index);
    });

  /** ===== Thumb 动画样式 ===== */
  const animatedThumbStyle = useAnimatedStyle(() => {
    if (vertical) {
      return {
        height: itemSizeSV.value - THUMB_INSET * 2,
        top: THUMB_INSET,
        left: THUMB_INSET,
        right: THUMB_INSET,
        transform: [{ translateY: translate.value }],
      };
    }
    return {
      width: itemSizeSV.value - THUMB_INSET * 2,
      left: THUMB_INSET,
      top: THUMB_INSET,
      bottom: THUMB_INSET,
      transform: [{ translateX: translate.value }],
    };
  });

  /** ===== Label 动画样式 ===== */
  const getLabelAnimatedStyle = (index: number) =>
    useAnimatedStyle(() => {
      const center = index * itemSizeSV.value;
      const color = interpolateColor(
        translate.value,
        [center - itemSizeSV.value, center, center + itemSizeSV.value],
        [colors.inactiveText, colors.activeText, colors.inactiveText],
      );
      return { color };
    });

  /** * 2. Layout 初始化
   * 这是修复初始显示问题的关键
   */
  const onLayout = (e: LayoutChangeEvent) => {
    const size = vertical
      ? e.nativeEvent.layout.height
      : e.nativeEvent.layout.width;

    const newItemSize = size / options.length;
    itemSizeSV.value = newItemSize;

    // 核心修复：在获取到尺寸的第一时间，根据 currentIndex 强行同步 translate 的值
    if (currentIndex >= 0) {
      translate.value = currentIndex * newItemSize;
    }
  };

  return (
    <GestureDetector gesture={panGesture}>
      <View
        onLayout={onLayout}
        style={[
          styles.container,
          { backgroundColor: colors.bgBack },
          vertical
            ? {
              height: height * options.length,
              width: VERTICAL_WIDTH,
              flexDirection: "column",
            }
            : { height, flexDirection: "row" },
        ]}
      >
        {/* 滑块背景 */}
        <Animated.View
          pointerEvents="none"
          style={[styles.thumbBase, { backgroundColor: colors.bgFront }, animatedThumbStyle]}
        />

        {/* 选项列表 */}
        {options.map((opt, index) => {
          const labelStyle = getLabelAnimatedStyle(index);
          return (
            <Pressable
              key={opt.value}
              style={styles.item}
              onPress={() => handlePress(index)}
            >
              <Animated.Text style={[styles.label, labelStyle]}>
                {opt.label}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    flex: 1,
  },
  thumbBase: {
    position: "absolute",
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 2,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // 确保文字在滑块上方
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
