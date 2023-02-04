export default function useEventBus() {
  const bus = new Vue()
  const emit = (event, ...args) => bus.$emit(event, ...args)
  const on = (event, callback) => bus.$on(event, callback)
  const off = (event, callback) => bus.$off(event, callback)
  return { emit, on, off }
}
