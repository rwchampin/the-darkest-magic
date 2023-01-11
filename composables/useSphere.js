export const useSphere = (props, physics) => {
  const { position, rotation, ...rest } = props
  const [ref] = useCannon({ ...rest, position, rotation }, (body) => {
    physics.add(body)
  })
  return ref
}

