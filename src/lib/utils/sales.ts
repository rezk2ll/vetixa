import { type InventorySaleItem } from '$types';

export const getSaleType = (type: InventorySaleItem['type']) => {
	switch (type) {
		case 'toilettage':
			return 'Toilettage';
		case 'surgical_act':
			return 'Acte chirurgical';
		case 'medical_act':
			return 'Acte médical';
		case 'hospit':
			return 'Hospitalisation';
		case 'visit':
			return 'Consultation';
		case 'sale':
			return 'Vente';
		default:
			return '';
	}
};
