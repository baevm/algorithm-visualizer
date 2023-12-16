import { MantineColorScheme, isMantineColorScheme } from '@mantine/core'

interface MantineColorSchemeManager {
  /** Function to retrieve color scheme value from external storage, for example window.localStorage */
  get(defaultValue: MantineColorScheme): MantineColorScheme

  /** Function to set color scheme value in external storage, for example window.localStorage */
  set(value: MantineColorScheme): void

  /** Function to subscribe to color scheme changes triggered by external events */
  subscribe(onUpdate: (colorScheme: MantineColorScheme) => void): void

  /** Function to unsubscribe from color scheme changes triggered by external events */
  unsubscribe(): void

  /** Function to clear value from external storage */
  clear(): void
}

export interface LocalStorageColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `mantine-color-scheme` by default */
  key?: string
}

export function localStorageColorSchemeManager({
  key = 'mantine-color-scheme',
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue
      }

      try {
        return (window.localStorage.getItem(key) as MantineColorScheme) || defaultValue
      } catch {
        return defaultValue
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[@mantine/core] Local storage color scheme manager was unable to save color scheme.', error)
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue)
        }
      }

      window.addEventListener('storage', handleStorageEvent)
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent)
    },

    clear: () => {
      window.localStorage.removeItem(key)
    },
  }
}

export const colorSchemeManager = localStorageColorSchemeManager({ key: 'color-theme' })
