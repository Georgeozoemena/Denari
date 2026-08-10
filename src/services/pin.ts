import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_KEY = '@denari:pin_hash';
const PIN_ATTEMPTS_KEY = '@denari:pin_attempts';
const PIN_LOCKOUT_KEY = '@denari:pin_lockout';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 300000; // 5 minutes in milliseconds

/**
 * Simple but improved hash function for PIN storage
 * For v1.0 local-only app. In v2.0, consider expo-crypto for SHA-256
 */
function hashPIN(pin: string): string {
  const salt = 'denari_v1_2024_salt';
  let hash = 5381;
  const input = salt + pin + salt;
  
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i);
  }
  
  // Convert to positive hex string
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Check if user is currently locked out
 */
async function isLockedOut(): Promise<boolean> {
  try {
    const lockoutTime = await AsyncStorage.getItem(PIN_LOCKOUT_KEY);
    if (!lockoutTime) return false;
    
    const now = Date.now();
    const lockoutUntil = parseInt(lockoutTime, 10);
    
    if (now < lockoutUntil) {
      return true;
    } else {
      // Lockout expired, clear it
      await AsyncStorage.removeItem(PIN_LOCKOUT_KEY);
      await AsyncStorage.removeItem(PIN_ATTEMPTS_KEY);
      return false;
    }
  } catch (error) {
    console.error('Error checking lockout:', error);
    return false;
  }
}

/**
 * Get remaining lockout time in seconds
 */
export async function getLockoutTimeRemaining(): Promise<number> {
  try {
    const lockoutTime = await AsyncStorage.getItem(PIN_LOCKOUT_KEY);
    if (!lockoutTime) return 0;
    
    const now = Date.now();
    const lockoutUntil = parseInt(lockoutTime, 10);
    const remaining = Math.max(0, Math.ceil((lockoutUntil - now) / 1000));
    
    return remaining;
  } catch (error) {
    return 0;
  }
}

/**
 * Increment failed attempts and check for lockout
 */
async function incrementAttempts(): Promise<{ locked: boolean; remaining: number }> {
  try {
    const attemptsStr = await AsyncStorage.getItem(PIN_ATTEMPTS_KEY);
    const attempts = attemptsStr ? parseInt(attemptsStr, 10) : 0;
    const newAttempts = attempts + 1;
    
    await AsyncStorage.setItem(PIN_ATTEMPTS_KEY, newAttempts.toString());
    
    if (newAttempts >= MAX_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION;
      await AsyncStorage.setItem(PIN_LOCKOUT_KEY, lockoutUntil.toString());
      return { locked: true, remaining: 0 };
    }
    
    return { locked: false, remaining: MAX_ATTEMPTS - newAttempts };
  } catch (error) {
    console.error('Error incrementing attempts:', error);
    return { locked: false, remaining: MAX_ATTEMPTS };
  }
}

/**
 * Reset failed attempts on successful login
 */
async function resetAttempts(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PIN_ATTEMPTS_KEY);
    await AsyncStorage.removeItem(PIN_LOCKOUT_KEY);
  } catch (error) {
    console.error('Error resetting attempts:', error);
  }
}

/**
 * Save PIN securely (hashed)
 */
export async function savePIN(pin: string): Promise<void> {
  try {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      throw new Error('PIN must be exactly 4 digits');
    }
    
    const hash = hashPIN(pin);
    await AsyncStorage.setItem(PIN_KEY, hash);
    await resetAttempts();
  } catch (error) {
    console.error('Error saving PIN:', error);
    throw new Error('Failed to save PIN');
  }
}

/**
 * Verify PIN with rate limiting
 */
export async function verifyPIN(pin: string): Promise<{ success: boolean; message?: string; remaining?: number }> {
  try {
    // Check lockout first
    if (await isLockedOut()) {
      const remaining = await getLockoutTimeRemaining();
      return {
        success: false,
        message: `Too many failed attempts. Try again in ${Math.ceil(remaining / 60)} minutes.`,
      };
    }
    
    const storedHash = await AsyncStorage.getItem(PIN_KEY);
    if (!storedHash) {
      return { success: false, message: 'No PIN set' };
    }
    
    const inputHash = hashPIN(pin);
    
    if (inputHash === storedHash) {
      await resetAttempts();
      return { success: true };
    } else {
      const { locked, remaining } = await incrementAttempts();
      
      if (locked) {
        return {
          success: false,
          message: `Too many failed attempts. Locked for ${LOCKOUT_DURATION / 60000} minutes.`,
        };
      } else {
        return {
          success: false,
          message: `Incorrect PIN. ${remaining} attempts remaining.`,
          remaining,
        };
      }
    }
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return { success: false, message: 'Verification failed' };
  }
}

/**
 * Check if PIN exists
 */
export async function hasPIN(): Promise<boolean> {
  try {
    const pin = await AsyncStorage.getItem(PIN_KEY);
    return pin !== null;
  } catch (error) {
    console.error('Error checking PIN:', error);
    return false;
  }
}

/**
 * Clear PIN (for security reset)
 */
export async function clearPIN(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PIN_KEY);
    await resetAttempts();
  } catch (error) {
    console.error('Error clearing PIN:', error);
  }
}
