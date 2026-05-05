import { FontAwesome5 } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';

type InputProps = Readonly<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numeric?: boolean;
  required?: boolean;
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
  hint?: string;
  maxLength?: number;
}>;

export function InputWeb({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  numeric,
  required,
  icon,
  hint,
  maxLength,
}: InputProps) {
  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {icon ? <FontAwesome5 name={icon} size={11} color="#7a6f63" /> : null}
          <Text className="text-[11px] font-bold uppercase tracking-widest text-ink-400">
            {label}
            {required ? <Text className="text-brand-500"> *</Text> : null}
          </Text>
        </View>
        {hint ? <Text className="text-[10px] text-ink-400">{hint}</Text> : null}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a59889"
        multiline={multiline}
        keyboardType={numeric ? 'numeric' : 'default'}
        maxLength={maxLength}
        className="rounded-2xl border-2 border-cream-200 bg-cream-50 px-4 py-3 text-sm text-ink-900"
        style={{
          outline: 'none' as any,
          minHeight: multiline ? 110 : undefined,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
    </View>
  );
}

type ScoreProps = Readonly<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  required?: boolean;
}>;

export function ScoreInput({ label, value, onChange, max = 5, required }: ScoreProps) {
  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center gap-2">
        <FontAwesome5 name="star" size={11} color="#fbbf24" solid />
        <Text className="text-[11px] font-bold uppercase tracking-widest text-ink-400">
          {label}
          {required ? <Text className="text-brand-500"> *</Text> : null}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
          const isActive = n <= value;
          return (
            <Pressable
              key={n}
              onPress={() => onChange(n)}
              className={`h-11 w-11 items-center justify-center rounded-2xl border-2 ${
                isActive ? 'border-transparent bg-brand-500' : 'border-cream-200 bg-cream-50'
              }`}
              style={{ cursor: 'pointer' as any }}>
              <FontAwesome5
                name="star"
                size={14}
                color={isActive ? '#fff' : '#d8cfc4'}
                solid={isActive}
              />
            </Pressable>
          );
        })}
        <Text className="ml-2 text-sm font-bold text-ink-700">
          {value > 0 ? `${value} / ${max}` : 'Selecciona una puntuación'}
        </Text>
      </View>
    </View>
  );
}

type SubmitProps = Readonly<{
  onPress: () => void;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
  children: ReactNode;
}>;

export function SubmitButton({
  onPress,
  loading,
  loadingText,
  disabled,
  icon,
  children,
}: SubmitProps) {
  const isDisabled = loading || disabled;
  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      className="mt-2 flex-row items-center justify-center gap-2 rounded-2xl py-3.5"
      style={{
        backgroundImage: 'linear-gradient(120deg, #fb923c, #f97316)',
        opacity: isDisabled ? 0.6 : 1,
        cursor: (isDisabled ? 'not-allowed' : 'pointer') as any,
        boxShadow: '0 18px 38px -16px rgba(249,115,22,0.55)' as any,
      }}>
      {loading ? <ActivityIndicator size="small" color="#fff" /> : null}
      {!loading && icon ? <FontAwesome5 name={icon} size={12} color="#fff" /> : null}
      <Text className="text-sm font-bold text-white">
        {loading ? loadingText ?? 'Enviando...' : children}
      </Text>
    </Pressable>
  );
}

type GhostProps = Readonly<{
  onPress: () => void;
  children: ReactNode;
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
}>;

export function GhostButton({ onPress, icon, children }: GhostProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center gap-2 rounded-2xl border border-cream-200 bg-white px-5 py-3"
      style={{ cursor: 'pointer' as any }}>
      {icon ? <FontAwesome5 name={icon} size={11} color="#df5a05" /> : null}
      <Text className="text-sm font-bold text-brand-700">{children}</Text>
    </Pressable>
  );
}
