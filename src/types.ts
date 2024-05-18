import type {
	FundTransactionsResponse,
	QueueResponse,
	VisitsResponse,
	AnimalsResponse,
	ClientsResponse,
	BillsResponse,
	ClinicalExamsResponse,
	MedicalActsResponse,
	SurgicalActsResponse,
	HospitalisationResponse,
	InventoryItemResponse
} from './pocketbase-types';

export * from './pocketbase-types';

export type storeStatusFilter = 'all' | 'available' | 'alert' | 'unavailable';
export type fundsStatusFilter = 'all' | 'income' | 'expense';
export type QueueStatusFilter = 'pending' | 'completed';
export type AnimalStatusFilter = 'all' | 'chat' | 'chien' | 'male' | 'female';
export type VisitStatusFilter = 'all' | 'pending' | 'partial' | 'completed';

export interface Fund extends FundTransactionsResponse {
	category: string;
	description: string;
}

export interface QueueItem extends Omit<QueueResponse, 'visit'> {
	visit: QueueVisit;
}

export interface QueueVisit extends Omit<VisitsResponse, 'animal'> {
	animal: expandedAnimal;
	bill: BillsResponse;
}

export interface Visit
	extends Omit<
		VisitsResponse,
		'animal' | 'clinical_exams' | 'medical_acts' | 'surgical_acts' | 'hospit' | 'store_items'
	> {
	animal: expandedAnimal;
	bill: BillsResponse;
	clinical_exams: ClinicalExamsResponse[];
	medical_acts: MedicalActsResponse[];
	surgical_acts: SurgicalActsResponse[];
	hospit: HospitalisationResponse<Treatment[]>;
	store_items: InventoryItemResponse[];
}

export interface expandedAnimal extends Omit<AnimalsResponse, 'client'> {
	client: ClientsResponse;
}

export type Queue = QueueItem[];

export type ClientsResponseData = IClient[];

export interface IClient extends Omit<ClientsResponse, 'animals'> {
	animals: AnimalsResponse[];
}

export type PaymentMethodType = 'cash' | 'tpe' | 'cheque';
export type VisitTabsType =
	| 'info'
	| 'exams'
	| 'diagnostics'
	| 'files'
	| 'hospit'
	| 'shop'
	| 'actions'
	| 'medical_acts'
	| 'surgical_acts'
  | 'treatments';

export interface FileInfo {
	mime: string;
	size: number;
}

export interface visitListItem extends Omit<VisitsResponse, 'animal'> {
	animal: AnimalsResponse;
	bill: BillsResponse;
	total: number;
	client: ClientsResponse;
}

export interface visitPageInfo {
	items: visitListItem[];
	page: number;
	totalPages: number;
	totalItems: number;
	perPage: number;
	query: string;
	count: visitCount;
	filter: VisitStatusFilter;
}

export interface visitCount {
	pending: number;
	paid: number;
	partial: number;
}

export interface Treatment {
	date: string;
	observations: Observation[];
	traitement?: string;
}

export interface Observation {
	time?: string;
	state?: AnimalState;
	responsible?: string;
	alimentation?: boolean;
	abreuvement?: boolean;
	urines?: UrinesType;
	matiere_fecale?: MatiereFecale;
	vaumissement?: boolean;
	temperature?: string;
}

export type MatiereFecale =
	| 'Normale'
	| 'Diarrhée jaune'
	| 'diarrhée verte'
	| 'Diarrhée noire'
	| 'Diarrhée décolorée';

export type AnimalState =
	| 'Détériorisé'
	| 'Moyen'
	| 'Etat de choc'
	| 'Bon'
	| 'Amélioré'
	| 'Moyen +/-'
	| 'Mauvais'
	| 'Stable';

export type UrinesType = 'Normale' | 'Hemorragique' | 'Foncée' | "Pas d'urine";

export interface BillInformation {
	id: string;
	client: string;
	animal: string;
	items: BillItem[];
}

export interface BillItem {
	name: string;
	price: number;
	quantity: number;
	total: number;
	code?: string;
}

export type FundPaymentMethodsStats = Record<
	string,
	{
		count: number;
		total: number;
	}
>;

export interface entityDetails {
	name: string;
	value: string | number;
	isAge?: boolean;
	death?: string;
	prefix?: string;
}

export type entityDetailsList = entityDetails[];
