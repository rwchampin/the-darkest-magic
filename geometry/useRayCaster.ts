const useRayCasterFN = () => {
  const raycaster = new Raycaster()

  const onMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  return {
    raycaster,
  }
}

const useRayCaster = createSharedComposable(useRayCasterFN)

export { useRayCaster }
