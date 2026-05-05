import { FontAwesome5 } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

type Props = Readonly<{
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
  children: ReactNode;
}>;

export function ModalForm({ open, onClose, title, subtitle, icon, children }: Props) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center px-4"
        style={{ backgroundColor: 'rgba(31,27,22,0.55)' }}>
        <Pressable
          onPress={() => undefined}
          className="w-full max-w-lg overflow-hidden rounded-3xl bg-white"
          style={{
            cursor: 'default' as any,
            boxShadow: '0 40px 80px -30px rgba(124,45,18,0.45)' as any,
          }}>
          <View
            className="flex-row items-start justify-between px-6 py-5"
            style={{ backgroundImage: 'linear-gradient(135deg, #fff5ec, #ffe6d0)' }}>
            <View className="flex-1 flex-row items-center gap-3">
              {icon ? (
                <View
                  className="h-11 w-11 items-center justify-center rounded-2xl bg-brand-500"
                  style={{ boxShadow: '0 12px 24px -10px rgba(249,115,22,0.55)' as any }}>
                  <FontAwesome5 name={icon} size={16} color="#fff" />
                </View>
              ) : null}
              <View className="flex-1">
                <Text className="font-display text-xl font-bold text-ink-900">{title}</Text>
                {subtitle ? (
                  <Text className="mt-0.5 text-sm text-ink-500">{subtitle}</Text>
                ) : null}
              </View>
            </View>
            <Pressable
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-white"
              style={{ cursor: 'pointer' as any }}>
              <FontAwesome5 name="times" size={14} color="#5b5247" />
            </Pressable>
          </View>
          <ScrollView
            style={{ maxHeight: 520 }}
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
