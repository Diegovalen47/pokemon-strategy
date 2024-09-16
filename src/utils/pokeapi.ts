export const getIdFromUrl = (url: string): number => {
  const urlParts = url.split('/')
  return Number(urlParts[urlParts.length - 2])
}
