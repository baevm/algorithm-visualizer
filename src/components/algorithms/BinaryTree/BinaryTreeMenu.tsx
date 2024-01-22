import { DFSTechnique, TreeAlgorithmType } from '@/helpers/algorithms/binaryTree'
import { useAutoMode } from '@/hooks/useAutoMode'
import { Mode, useOperatingMode } from '@/hooks/useOperatingMode'
import { binaryTreeStore } from '@/stores/binaryTreeStore'
import { Button, Group, NumberInput, Radio, Stack, Textarea } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const BinaryTreeMenu = observer(() => {
  const { mode, setMode } = useOperatingMode()
  const {
    array,
    target,
    isWorking,
    isFound,
    algorithm,
    setArray,
    startWorking,
    setTarget,
    nextStep,
    reset,
    setAlgorithm,
  } = binaryTreeStore

  const { stepTimeout, setStepTimeout } = useAutoMode({
    isFound,
    isWorking,
    mode,
    timeout: 1000,
    nextStep,
  })

  const setRandomData = () => {
    const size = 6

    // TODO: generate random binary tree
    const rndArr = [5, 3, 8, 11, null, 13, 4, 7, 2, null, null, null, null, 1].map((v) =>
      v === null ? 'null' : v.toString(),
    )

    const rndTargetFromArr = rndArr[Math.floor(Math.random() * rndArr.length)]

    setArray(rndArr)
    setTarget(rndTargetFromArr)
  }

  const onChangeArray = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const arr = e.currentTarget.value.split(',')
    setArray(arr)
  }

  useEffect(() => {
    setRandomData()

    return () => {
      reset()
    }
  }, [])

  const changeAlgoType = (v: string) => {
    setAlgorithm({ type: v as TreeAlgorithmType, technique: algorithm.technique })
  }

  const changeAlgoTech = (v: string) => {
    setAlgorithm({ type: algorithm.type, technique: v as DFSTechnique })
  }

  return (
    <Stack>
      <Group justify='space-between' grow>
        <Button onClick={setRandomData} disabled>
          Рандом
        </Button>
        <Button onClick={reset}>Сбросить</Button>
      </Group>

      <Group justify='space-between' grow>
        {!isWorking ? (
          <Button onClick={startWorking}>Запуск</Button>
        ) : (
          <>
            {mode === 'steps-mode' && (
              <>
                <Button disabled>Шаг назад</Button>
                <Button onClick={nextStep}>Шаг вперед</Button>
              </>
            )}
          </>
        )}
      </Group>

      <Textarea
        label='Бинарное дерево'
        placeholder='Введите дерево в формате 5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, null, 1'
        disabled
        value={array.join(',')}
        onChange={onChangeArray}
        autosize
      />

      <NumberInput
        label='Число для поиска'
        placeholder='Введите число...'
        disabled={isWorking}
        value={target || ''}
        onChange={(num) => setTarget(num.toString())}
        hideControls={true}
      />

      <Radio.Group label='Алгоритм' defaultValue={algorithm.type} value={algorithm.type} onChange={changeAlgoType}>
        <Stack>
          <Radio disabled={isWorking} label='BFS' value='bfs' />
          <Radio disabled={isWorking} label='DFS' value='dfs' />
        </Stack>
      </Radio.Group>

      {algorithm.type === 'dfs' && (
        <Radio.Group
          label='Алгоритм обхода дерева'
          defaultValue={algorithm.technique}
          value={algorithm.technique}
          onChange={changeAlgoTech}>
          <Stack>
            <Radio disabled={isWorking} label='Прямой (preorder)' value='preorder' />
            <Radio disabled={isWorking} label='Центрированный (inorder)' value='inorder' />
            <Radio disabled={isWorking} label='Обратный (postorder)' value='postorder' />
          </Stack>
        </Radio.Group>
      )}

      <Radio.Group label='Режим работы' defaultValue={mode} value={mode} onChange={(v) => setMode(v as Mode)}>
        <Stack>
          <Radio disabled={isWorking} label='Автоматически' value='auto-mode' />
          <Radio disabled={isWorking} label='По шагам' value='steps-mode' />
        </Stack>
      </Radio.Group>

      {mode === 'auto-mode' && (
        <NumberInput
          label='Задержка (мс)'
          description='Задержка между шагами алгоритма'
          placeholder='Введите число...'
          disabled={isWorking}
          value={stepTimeout}
          onChange={(num) => setStepTimeout(+num)}
          hideControls={true}
        />
      )}
    </Stack>
  )
})

export default BinaryTreeMenu
