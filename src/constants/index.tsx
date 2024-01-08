import { TbBinaryTree, TbListSearch, TbSortAscendingNumbers, TbBrandGraphql } from 'react-icons/tb'

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
  {
    title: 'Алгоритм Дейкстры',
    icon: <TbBrandGraphql />,
    value: 'dijkstra',
  },
] as const

export type AlgoValues = (typeof ALGORITHMS)[number]['value']
