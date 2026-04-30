import type { ReactNode } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable } from 'react-native';

type Props = Readonly<{
  children: ReactNode;
  style?: ViewStyle;
  className?: string;
  lift?: number;
  onPress?: () => void;
}>;

export function HoverCard({ children, style, className, lift = 6, onPress }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  let translateY = 0;
  if (!pressed && hovered) translateY = -lift;

  const boxShadow = hovered
    ? '0 28px 60px -24px rgba(124, 45, 18, 0.32), 0 8px 16px -8px rgba(124, 45, 18, 0.18)'
    : '0 12px 30px -18px rgba(124, 45, 18, 0.22), 0 4px 8px -4px rgba(124, 45, 18, 0.08)';

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={className}
      style={[
        {
          transform: [{ translateY }],
          boxShadow,
          cursor: 'pointer' as any,
        },
        style,
      ]}>
      {children}
    </Pressable>
  );
}
