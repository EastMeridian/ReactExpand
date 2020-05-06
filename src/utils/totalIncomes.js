export const totalIncomes = (
  flatIncome,
  incomePerPopulation,
  population,
  incomeFactor,
) => (flatIncome + incomePerPopulation * population) * incomeFactor;