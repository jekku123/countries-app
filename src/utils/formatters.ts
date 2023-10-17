import iso from "iso-3166-1"

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
})

export const formatNeighbourCountries = (borders: string[]) => {
  const neighbours = borders.reduce((acc: string[], border: string) => {
    const neighbour = iso.whereAlpha3(border)?.country
    if (neighbour !== undefined) {
      return [...acc, neighbour]
    }
    return acc
  }, [])

  return formatter.format(neighbours)
}
