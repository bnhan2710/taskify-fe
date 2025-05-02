import { useCallback } from 'react'
import { debounce } from 'lodash'
export const useDebounceFn = (fnToDebounce, delay = 500) => {
  if (delay < 0) {
    throw new Error('Delay value should be greater than or equal to 0.')
  }
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.')
  }
  if (!fnToDebounce || (typeof fnToDebounce !== 'function')) {
    throw new Error('Debounce must have a function')
  }

  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay])
}
