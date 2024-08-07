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
	InventoryItemResponse,
	CagesResponse
} from './pocketbase-types';

export * from './pocketbase-types';

export type storeStatusFilter = 'all' | 'available' | 'alert' | 'unavailable';
export type fundsStatusFilter = 'all' | 'income' | 'expense';
export type QueueStatusFilter = 'pending' | 'completed';
export type AnimalStatusFilter = 'all' | 'chat' | 'chien' | 'male' | 'female';
export type VisitStatusFilter = 'all' | 'pending' | 'partial' | 'completed' | 'control';
export type HospitStatusFilter = 'all' | 'pending' | 'complete';
export type BillStatusFilter = VisitStatusFilter;

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
		VisitsResponse<ItemMetadata[]>,
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

export interface AnimalVisit extends Omit<VisitsResponse, 'animal'> {
	animal: expandedAnimal;
	bill: BillsResponse;
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
export interface PaymentMethod {
	value: PaymentMethodType;
	label: string;
}

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

export interface PageInfo<T> {
	items: T[];
	page: number;
	totalPages: number;
	totalItems: number;
	perPage: number;
	query: string;
}

export interface visitListItem extends Omit<VisitsResponse, 'animal'> {
	animal: AnimalsResponse;
	bill: BillsResponse;
	total: number;
	client: ClientsResponse;
}

export interface visitPageInfo extends PageInfo<visitListItem> {
	count: visitCount;
	filter: VisitStatusFilter;
}

export interface HospitPageInfo extends PageInfo<Hospit> {
	filter: HospitStatusFilter;
	count: HospitCount;
}

export interface FundsPageInfo extends PageInfo<Fund> {
	filter: fundsStatusFilter;
	total: FundsTotal;
	count: FundsCount;
	startDate: string;
	endDate: string;
}

export interface FundsCount {
	all: number;
}

export interface ClientsPageInfo extends PageInfo<IClient> {}

export interface AnimalsPageInfo extends PageInfo<AnimalsResponse> {
	filter: AnimalStatusFilter;
	count: AnimalsCount;
}

export interface AnimalsCount {
	all: number;
	dogs: number;
	cats: number;
	male: number;
	female: number;
}

export interface FundsTotal {
	income: number;
	expense: number;
	balance: number;
	remaining: number;
}

export interface HospitCount {
	all: number;
	completed: number;
	pending: number;
}

export interface Hospit extends Omit<HospitalisationResponse<Treatment[]>, 'visit' | 'cage'> {
	visit: HospitVisitItem;
	cage: CagesResponse;
}

export interface HospitVisitItem extends Omit<VisitsResponse, 'animal'> {
	animal: AnimalsResponse;
	client: ClientsResponse;
}

export interface visitCount {
	total: number;
	pending: number;
	paid: number;
	partial: number;
	control: number;
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
	discount: number;
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
	dead?: boolean;
	prefix?: string;
}

export type entityDetailsList = entityDetails[];

export type SearchEntityType = 'client' | 'animal';

export interface SearchResultInfo {
	items: (AnimalsResponse | ClientsResponse)[];
	page: number;
	totalPages: number;
	totalItems: number;
	perPage: number;
	query: string;
	target: SearchEntityType;
}

export interface CageItem extends CagesResponse {
	hospit?: Hospit;
}

export interface ItemMetadata {
	item: string;
	quantity: number;
	discount: number;
}

export interface InventoryItemInfo {
	name: string;
	quantity: number;
	price: number;
}

export interface ClientBill extends BillsResponse {
	control: boolean;
}

export interface PaymentInformation extends BillsResponse {
	history: FundTransactionsResponse[];
}
export type PrintableTab = 'documents' | 'certificates';
