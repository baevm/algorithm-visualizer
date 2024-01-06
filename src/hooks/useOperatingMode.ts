import { useState } from 'react'

export const modes = ['auto-mode', 'steps-mode'] as const
export type Mode = (typeof modes)[number]

export const useOperatingMode = () => {
  const [mode, setMode] = useState<Mode>('auto-mode')

  return { mode, setMode }
}
