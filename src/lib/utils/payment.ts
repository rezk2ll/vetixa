import type { PaymentMethod } from '$types';

export const paymentMethods: PaymentMethod[] = [
	{
		label: 'Espèces',
		value: 'cash'
	},
	{
		label: 'TPE',
		value: 'tpe'
	},
	{
		label: 'Chèque',
		value: 'cheque'
	}
];
