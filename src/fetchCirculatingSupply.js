const fetch = require('node-fetch')

const fetchTokens = async () => {
  const tokens = await (await fetch('https://api.coingecko.com/api/v3/coins/list')).json()
  return tokens
}

exports.getCoingeckoCircSupply = async (botTokenSymbol) => {
  const tokens = await fetchTokens()
  const tokenFound = tokens.find((token) => token.symbol === botTokenSymbol.toLowerCase())

  if (!tokenFound) return undefined

  const tokenId = tokenFound.id
  const tokenData = await (await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}`)).json()
  const circSupply = tokenData.market_data.circulating_supply

  // eslint-disable-next-line
  return circSupply
}
