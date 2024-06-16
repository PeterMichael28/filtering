


export const getRandomPrice = () => {
  const PRICES = [900, 190, 209, 340, 560]
  return PRICES[Math.floor(Math.random() * PRICES.length)]
}

export const COLORS = ['white', 'beige', 'blue', 'green', 'purple'] as const
export const SIZES = ['S', 'M', 'L'] as const

