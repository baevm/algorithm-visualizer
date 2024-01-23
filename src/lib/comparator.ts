export type Operator = '<' | '>' | '<=' | '>=' | '==='

/**
 * Compare 2 values function.
 * To use with Proxy object and count amount of calls
 */
export const compare = (first: string, operator: Operator, second: string) => {
  const v1 = parseInt(first)
  const v2 = parseInt(second)

  switch (operator) {
    case '<':
      return v1 < v2

    case '>':
      return v1 > v2

    case '<=':
      return v1 <= v2

    case '>=':
      return v1 >= v2

    case '===':
      return v1 === v2
  }
}

export type CompareFn = typeof compare
