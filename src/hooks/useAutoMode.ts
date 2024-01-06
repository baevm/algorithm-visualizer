import { useEffect, useState } from 'react'
import { Mode } from './useOperatingMode'

type Props = {
  isWorking: boolean
  mode: Mode
  isFound: boolean
  timeout: number
  nextStep: () => void
}

export function useAutoMode({ isWorking, mode, isFound, timeout = 500, nextStep }: Props) {
  const [stepTimeout, setStepTimeout] = useState(timeout)

  // react... but atleast it works
  // auto-mode steps
  useEffect(() => {
    if (isWorking && mode === 'auto-mode') {
      const timer = setInterval(() => {
        nextStep()

        if (isFound) {
          clearInterval(timer)
        }
      }, stepTimeout)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isWorking, mode, stepTimeout, nextStep, isFound])

  return { stepTimeout, setStepTimeout }
}
