import { TbBinaryTree, TbListSearch, TbSortAscendingNumbers } from 'react-icons/tb'

export const ALGORITHMS = [
  {
    title: 'Бинарный поиск',
    icon: <TbListSearch />,
    value: 'binary-search',
  },
  {
    title: 'Сортировка',
    icon: <TbSortAscendingNumbers />,
    value: 'sort',
  },
  {
    title: 'Бинарное дерево',
    icon: <TbBinaryTree />,
    value: 'binary-tree',
  },
] as const

export type AlgoValues = (typeof ALGORITHMS)[number]['value']
