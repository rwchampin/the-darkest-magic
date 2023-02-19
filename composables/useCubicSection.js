import { Vec2 } from 'utils/Vectorpedia'

export const useCubicSection = () => {
  createCubicBezier = (p0, p1, p2, p3) => {
    return (t) => {
      const x = (1 - t) ** 3 * p0.x + 3 * t * (1 - t) ** 2 * p1.x + 3 * t ** 2 * (1 - t) * p2.x + t ** 3 * p3.x
      const y = (1 - t) ** 3 * p0.y + 3 * t * (1 - t) ** 2 * p1.y + 3 * t ** 2 * (1 - t) * p2.y + t ** 3 * p3.y
      return new Vector2(x, y)
    }
  }

  createFullWidthCubicBezier = (p0, p1, p2, p3) => {
    const cubicBezier = createCubicBezier(p0, p1, p2, p3)
    return (t) => {
      const { x, y } = cubicBezier(t)
      return new Vector2(x * window.innerWidth, y * window.innerHeight)
    }
  }

  createDraggableCubicBezier = (p0, p1, p2, p3) => {
    const cubicBezier = createCubicBezier(p0, p1, p2, p3)
    return (t) => {
      const { x, y } = cubicBezier(t)
      return new Vector2(x * window.innerWidth, y * window.innerHeight)
    }
  }

  createDraggablePoint = (x, y) => {
    const point = new Vector2(x, y)
    const draggablePoint = new DraggablePoint(point)
    draggablePoint.onDrag = () => {
      this.update()
    }
    return draggablePoint
  }
}
