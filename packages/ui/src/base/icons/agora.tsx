import React, { useEffect } from "react";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Circle, type CircleProps } from "react-native-svg";
import type { TIconProps } from "../types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Agora = ({ size = 24, color = "#000000", variant = "fill" }: TIconProps) => {
  const strokeWidth = size > 24 ? 2.5 : 1.5;
  const radius = size / 2 - strokeWidth; // Adjust radius for stroke width
  // Shared values for opacity animations
  const opacityFill = useSharedValue(variant === "fill" ? 1 : 0);
  const animatedRadius = useSharedValue(0); // Scale for the inner circle
  const opacityOutline = useSharedValue(variant === "outline" ? 1 : 0);
  const animatedProgress = useSharedValue(0); // For animating the dash offset

  // Animate opacity when variant changes
  useEffect(() => {
    opacityFill.value = withTiming(variant === "fill" ? 0 : 1, { duration: 300 }); // 300ms transition
    opacityOutline.value = withTiming(variant === "outline" ? 1 : 0, { duration: 300 });
    animatedProgress.value = withTiming(variant === "fill" ? gapLength : 0, { duration: 500 });
    animatedRadius.value = withTiming(variant === "fill" ? radius * 0.6 : 0, { duration: 500 });
  }, [variant]);

  const outerCircleProps = useAnimatedProps<CircleProps>(() => ({
    strokeDashoffset: animatedProgress.value, // Trims from the end
  }));

  const innerCircleProps = useAnimatedProps<CircleProps>(() => ({
    strokeDashoffset: animatedProgress.value,
    strokeOpacity: opacityFill.value,
  }));

  const fillCircleProps = useAnimatedProps<CircleProps>(() => ({
    r: animatedRadius.value, // Set the origin to the center of the circle
  }));

  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference / 6; // Fixed for 3 equal dashes
  const gapLength = circumference / 9;
  const dashArray = [dashLength, gapLength]; // Pattern: dash, gap, dash, gap, etc.

  return (
    <Svg width={size} height={size}>
      <AnimatedCircle
        animatedProps={outerCircleProps}
        stroke={color}
        strokeWidth={strokeWidth}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={dashArray}
        strokeLinejoin="round"
        strokeLinecap="round"
        fillOpacity={0}
      />
      <AnimatedCircle
        animatedProps={innerCircleProps}
        stroke={color}
        strokeWidth={strokeWidth}
        cx={size / 2}
        cy={size / 2}
        r={radius * 0.6}
        strokeDasharray={33}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeOpacity={1}
        fillOpacity={0}
      />
      <AnimatedCircle animatedProps={fillCircleProps} cx={size / 2} cy={size / 2} fill={color} fillOpacity={1} />
    </Svg>
  );
};

export default React.memo(Agora);
