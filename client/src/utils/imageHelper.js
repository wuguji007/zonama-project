export const getImageUrl = (path) => {
  // import.meta.env.BASE_URL 會自動讀取 vite.config.js 設定的 base
  return `${import.meta.env.BASE_URL}${path}`
}