export class Dijkstra {
  constructor() {}
}

export type DijkstraGenerator = Generator<
  {
    dist: any[]
    visited: any[]
    minIndex: number
  },
  void,
  unknown
>
