export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  return [...originalArray].sort((a, b) => {
    const indexA = orderArray.indexOf(String(a[key]))
    const indexB = orderArray.indexOf(String(b[key]))
    return indexA - indexB
  })
}
