import { FontAwesome5 } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

type Stat = {
  label: string;
  value: string | number;
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
};

type Props = Readonly<{
  eyebrow: string;
  title: string;
  subtitle: string;
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
  stats?: Stat[];
  action?: ReactNode;
  gradient?: 'sunrise' | 'rose' | 'sand';
}>;

const GRADIENTS: Record<NonNullable<Props['gradient']>, string> = {
  sunrise:
    'linear-gradient(135deg, #fb923c 0%, #f97316 35%, #ea580c 65%, #c2410c 100%)',
  rose: 'linear-gradient(135deg, #fb7185 0%, #f97316 50%, #f59e0b 100%)',
  sand: 'linear-gradient(135deg, #fbbf24 0%, #fb923c 50%, #f43f5e 100%)',
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  stats,
  action,
  gradient = 'sunrise',
}: Props) {
  return (
    <View
      className="overflow-hidden"
      style={{
        backgroundImage: GRADIENTS[gradient],
        backgroundColor: '#f97316',
      }}>
      {/* Decorative blobs */}
      <View
        pointerEvents="none"
        className="absolute -right-20 -top-24 h-72 w-72 rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.18)', filter: 'blur(8px)' as any }}
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.12)', filter: 'blur(12px)' as any }}
      />
      <View
        pointerEvents="none"
        className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full"
        style={{ backgroundColor: 'rgba(255,224,180,0.25)', filter: 'blur(20px)' as any }}
      />

      <View className="mx-auto w-full max-w-7xl px-6 pb-12 pt-14 md:pb-16 md:pt-20">
        <View className="flex-row items-end justify-between gap-6">
          <View className="flex-1">
            <View className="mb-4 flex-row items-center gap-3 self-start rounded-full bg-white/20 px-4 py-1.5"
              style={{ backdropFilter: 'blur(10px)' as any }}>
              {icon ? <FontAwesome5 name={icon} size={12} color="#fff" /> : null}
              <Text className="text-xs font-bold uppercase tracking-[3px] text-white">
                {eyebrow}
              </Text>
            </View>

            <Text
              className="font-display text-5xl font-bold leading-tight text-white md:text-6xl"
              style={{ letterSpacing: -1.5, textShadow: '0 2px 16px rgba(124,45,18,0.25)' } as any}>
              {title}
            </Text>
            <Text className="mt-3 max-w-xl text-base text-white/85 md:text-lg">
              {subtitle}
            </Text>

            {stats && stats.length > 0 ? (
              <View className="mt-6 flex-row flex-wrap gap-3">
                {stats.map((s) => (
                  <View
                    key={s.label}
                    className="flex-row items-center gap-2 rounded-2xl border border-white/30 bg-white/15 px-4 py-2"
                    style={{ backdropFilter: 'blur(10px)' as any }}>
                    {s.icon ? <FontAwesome5 name={s.icon} size={12} color="#fff" /> : null}
                    <Text className="text-lg font-bold text-white">{s.value}</Text>
                    <Text className="text-xs font-medium text-white/80">{s.label}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          {action ? <View className="hidden md:flex">{action}</View> : null}
        </View>
      </View>

      {/* Bottom curve */}
      <View
        pointerEvents="none"
        className="absolute bottom-0 left-0 right-0 h-8"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 100%, #fdf8f3 50%, transparent 51%)',
        }}
      />
    </View>
  );
}
