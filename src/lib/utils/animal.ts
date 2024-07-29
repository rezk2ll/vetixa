import type { AnimalsResponse } from '$types';

export const animalTypeList = [
	'chien',
	'chat',
	'oiseau',
	'vache',
	'cheval',
	'chèvre',
	'mouton',
	'lapin',
	'singe',
	'rongeur',
	'poisson',
	'amphibien',
	'petit mammifère',
	'animal de ferme',
	'animal de compagnie exotique',
	'animal sauvage',
	'reptile',
	'insecte',
	'autre'
];

export const unknownAnimal = {
	name: 'Animal supprimé',
} as AnimalsResponse;
