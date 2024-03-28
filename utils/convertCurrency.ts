export const convertCurrency = (amount: string | number) => {
	return new Intl.NumberFormat('en-EU', {
		style: 'currency',
		currency: 'EUR',
	}).format(+amount)
}
