import type { PaymentMethod, PaymentMethodType } from '$types';

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
	},
	{
		label: 'Virement',
		value: 'virement'
	}
];

export const getPaymentMethodLabel = (method: PaymentMethodType | string): string => {
	const found = paymentMethods.find((pm) => pm.value === method);
	return found?.label ?? method;
};
