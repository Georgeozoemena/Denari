import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { savePIN } from '@/services/pin';

export default function SetupPinScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const name = params.name as string;
  const email = params.email as string;
  const phone = params.phone as string;
  
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = async (num: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 4) {
      setIsLoading(true);
      try {
        // Save PIN securely
        await savePIN(newPin);
        
        setTimeout(() => {
          // Navigate to profile setup
          router.push({
            pathname: '/(auth)/profile-setup',
            params: { name, email, phone },
          });
        }, 300);
      } catch (error) {
        alert('Failed to save PIN. Please try again.');
        setPin('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <View style={styles.logoInnerCircle} />
        </View>
      </View>

      <Text style={styles.instruction}>Enter your 4-digit PIN</Text>

      {/* Dots Display */}
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              pin.length > index && styles.dotFilled,
            ]}
          />
        ))}
      </View>

      {/* Circular Keyboard */}
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
                    styles.keyButton,
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

      <Pressable style={styles.forgotPin}>
        <Text style={styles.forgotText}>Forgot PIN?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD7E15',
    padding: 24,
    paddingTop: 80,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  instruction: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    opacity: 0.9,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginVertical: 32,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotFilled: {
    backgroundColor: '#FFFFFF',
  },
  keyboard: {
    gap: 20,
    marginBottom: 20,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  keyCell: {
    width: 72,
    height: 72,
  },
  keyButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedKey: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  keyText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  forgotPin: {
    alignSelf: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  forgotText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
});
