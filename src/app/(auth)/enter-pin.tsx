import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function EnterPinScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 4) {
      setTimeout(() => {
        // Go straight to dashboard tabs
        router.replace('/(tabs)');
      }, 300);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.header}>
        <View style={styles.logoSymbol}>
          <Text style={styles.logoSymbolText}>D</Text>
        </View>
        <Text style={styles.title}>Enter your 4-digit PIN</Text>
      </View>

      {/* Dots Row */}
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              pin.length > index ? styles.dotFilled : styles.dotEmpty,
            ]}
          />
        ))}
      </View>

      {/* Keyboard Grid */}
      <View style={styles.keyboard}>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['', '0', '⌫'],
        ].map((row, rIdx) => (
          <View key={rIdx} style={styles.keyRow}>
            {row.map((key, kIdx) => {
              if (key === '') {
                return <View key={kIdx} style={styles.keyCell} />;
              }
              const isDelete = key === '⌫';
              return (
                <Pressable
                  key={kIdx}
                  style={({ pressed }) => [
                    styles.keyCell,
                    pressed && styles.pressedKey,
                  ]}
                  onPress={isDelete ? handleDelete : () => handleKeyPress(key)}>
                  <Text style={styles.keyText}>{key}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <Pressable style={styles.forgotBtn} onPress={() => {}}>
        <Text style={styles.forgotText}>Forgot PIN?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  logoSymbol: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSymbolText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginVertical: 32,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  dotEmpty: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotFilled: {
    backgroundColor: '#FFFFFF',
  },
  keyboard: {
    alignSelf: 'stretch',
    gap: 16,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyCell: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedKey: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  forgotBtn: {
    marginBottom: 20,
  },
  forgotText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
});
