import { ToWords } from 'to-words';

export const toWords = new ToWords({
	localeCode: 'fr-FR',
	converterOptions: {
		currency: true,
		ignoreDecimal: false,
		ignoreZeroCurrency: false,
		doNotAddOnly: false,
		currencyOptions: {
			name: 'Dinar',
			plural: 'Dinars',
			symbol: 'TND',
			fractionalUnit: {
				name: 'millime',
				plural: 'millimes',
				symbol: ''
			}
		}
	}
});
