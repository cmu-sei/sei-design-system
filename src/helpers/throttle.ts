export default function throttle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let isWaiting = false

  return (...args: T) => {
    if (!isWaiting) {
      callback(...args)
      isWaiting = true
      setTimeout(() => {
        isWaiting = false
      }, delay)
    }
  }
}