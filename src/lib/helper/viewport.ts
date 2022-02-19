const vh = (v: number): number => {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return (v * h) / 100
}

const vw = (v: number): number => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  return (v * w) / 100
}

const vmin = (v: number): number => {
  return Math.min(vh(v), vw(v))
}

const vmax = (v: number): number => {
  return Math.max(vh(v), vw(v))
}

export { vh, vw, vmin, vmax }