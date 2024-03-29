const decodeHtmlCharCodes = (str: string) =>
  str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
    String.fromCharCode(charCode)
  )

const getProductTitle = (product?: Product) =>
  product?.title.rendered ? decodeHtmlCharCodes(product?.title.rendered) : ''

const optionsToArray = (options?: string) => {
  if (!options) return
  return options.split(',').map(opt => opt.trim())
}

export { getProductTitle, decodeHtmlCharCodes, optionsToArray }
