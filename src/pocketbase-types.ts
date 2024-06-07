/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Agenda = "agenda",
	Animals = "animals",
	AnimalsCatsList = "animals_cats_list",
	AnimalsCatsView = "animals_cats_view",
	AnimalsDogsList = "animals_dogs_list",
	AnimalsDogsView = "animals_dogs_view",
	AnimalsFemaleList = "animals_female_list",
	AnimalsFemaleView = "animals_female_view",
	AnimalsMaleList = "animals_male_list",
	AnimalsMaleView = "animals_male_view",
	AvailableCages = "available_cages",
	Bills = "bills",
	Cages = "cages",
	Clients = "clients",
	ClinicalExams = "clinical_exams",
	FundTransactions = "fund_transactions",
	FundsExpenseList = "funds_expense_list",
	FundsIncomeList = "funds_income_list",
	HospitCompletedList = "hospit_completed_list",
	HospitCompletedView = "hospit_completed_view",
	HospitPendingList = "hospit_pending_list",
	HospitPendingView = "hospit_pending_view",
	Hospitalisation = "hospitalisation",
	InventoryItem = "inventory_item",
	InventorySale = "inventory_sale",
	MedicalActs = "medical_acts",
	Queue = "queue",
	SurgicalActs = "surgical_acts",
	Users = "users",
	Visits = "visits",
	VisitsPaidList = "visits_paid_list",
	VisitsPaidView = "visits_paid_view",
	VisitsPartialList = "visits_partial_list",
	VisitsPartialView = "visits_partial_view",
	VisitsPendingList = "visits_pending_list",
	VisitsPendingView = "visits_pending_view",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AgendaRecord = {
	description?: HTMLString
	end: IsoDateString
	location?: string
	start: IsoDateString
	title: string
}

export enum AnimalsSexOptions {
	"male" = "male",
	"female" = "female",
}

export enum AnimalsTypeOptions {
	"chien" = "chien",
	"chat" = "chat",
	"oiseau" = "oiseau",
	"vache" = "vache",
	"cheval" = "cheval",
	"chèvre" = "chèvre",
	"mouton" = "mouton",
	"lapin" = "lapin",
	"singe" = "singe",
	"rongeur" = "rongeur",
	"poisson" = "poisson",
	"amphibien" = "amphibien",
	"petit mammifère" = "petit mammifère",
	"animal de ferme" = "animal de ferme",
	"animal de compagnie exotique" = "animal de compagnie exotique",
	"animal sauvage" = "animal sauvage",
	"reptile" = "reptile",
	"insecte" = "insecte",
	"autre" = "autre",
}
export type AnimalsRecord = {
	birthday?: IsoDateString
	breed?: string
	client?: RecordIdString
	color?: string
	deathdate?: IsoDateString
	deceased?: boolean
	identifier?: string
	name?: string
	sex?: AnimalsSexOptions
	type?: AnimalsTypeOptions
	weight?: number
}

export enum AnimalsCatsListSexOptions {
	"male" = "male",
	"female" = "female",
}

export enum AnimalsCatsListTypeOptions {
	"chien" = "chien",
	"chat" = "chat",
	"oiseau" = "oiseau",
	"vache" = "vache",
	"cheval" = "cheval",
	"chèvre" = "chèvre",
	"mouton" = "mouton",
	"lapin" = "lapin",
	"singe" = "singe",
	"rongeur" = "rongeur",
	"poisson" = "poisson",
	"amphibien" = "amphibien",
	"petit mammifère" = "petit mammifère",
	"animal de ferme" = "animal de ferme",
	"animal de compagnie exotique" = "animal de compagnie exotique",
	"animal sauvage" = "animal sauvage",
	"reptile" = "reptile",
	"insecte" = "insecte",
	"autre" = "autre",
}
export type AnimalsCatsListRecord = {
	birthday?: IsoDateString
	breed?: string
	client?: RecordIdString
	color?: string
	deathdate?: IsoDateString
	deceased?: boolean
	identifier?: string
	name?: string
	sex?: AnimalsCatsListSexOptions
	type?: AnimalsCatsListTypeOptions
	weight?: number
}

export type AnimalsCatsViewRecord = {
	total?: number
}

export enum AnimalsDogsListSexOptions {
	"male" = "male",
	"female" = "female",
}

export enum AnimalsDogsListTypeOptions {
	"chien" = "chien",
	"chat" = "chat",
	"oiseau" = "oiseau",
	"vache" = "vache",
	"cheval" = "cheval",
	"chèvre" = "chèvre",
	"mouton" = "mouton",
	"lapin" = "lapin",
	"singe" = "singe",
	"rongeur" = "rongeur",
	"poisson" = "poisson",
	"amphibien" = "amphibien",
	"petit mammifère" = "petit mammifère",
	"animal de ferme" = "animal de ferme",
	"animal de compagnie exotique" = "animal de compagnie exotique",
	"animal sauvage" = "animal sauvage",
	"reptile" = "reptile",
	"insecte" = "insecte",
	"autre" = "autre",
}
export type AnimalsDogsListRecord = {
	birthday?: IsoDateString
	breed?: string
	client?: RecordIdString
	color?: string
	deathdate?: IsoDateString
	deceased?: boolean
	identifier?: string
	name?: string
	sex?: AnimalsDogsListSexOptions
	type?: AnimalsDogsListTypeOptions
	weight?: number
}

export type AnimalsDogsViewRecord = {
	total?: number
}

export enum AnimalsFemaleListSexOptions {
	"male" = "male",
	"female" = "female",
}

export enum AnimalsFemaleListTypeOptions {
	"chien" = "chien",
	"chat" = "chat",
	"oiseau" = "oiseau",
	"vache" = "vache",
	"cheval" = "cheval",
	"chèvre" = "chèvre",
	"mouton" = "mouton",
	"lapin" = "lapin",
	"singe" = "singe",
	"rongeur" = "rongeur",
	"poisson" = "poisson",
	"amphibien" = "amphibien",
	"petit mammifère" = "petit mammifère",
	"animal de ferme" = "animal de ferme",
	"animal de compagnie exotique" = "animal de compagnie exotique",
	"animal sauvage" = "animal sauvage",
	"reptile" = "reptile",
	"insecte" = "insecte",
	"autre" = "autre",
}
export type AnimalsFemaleListRecord = {
	birthday?: IsoDateString
	breed?: string
	client?: RecordIdString
	color?: string
	deathdate?: IsoDateString
	deceased?: boolean
	identifier?: string
	name?: string
	sex?: AnimalsFemaleListSexOptions
	type?: AnimalsFemaleListTypeOptions
	weight?: number
}

export type AnimalsFemaleViewRecord = {
	total?: number
}

export enum AnimalsMaleListSexOptions {
	"male" = "male",
	"female" = "female",
}

export enum AnimalsMaleListTypeOptions {
	"chien" = "chien",
	"chat" = "chat",
	"oiseau" = "oiseau",
	"vache" = "vache",
	"cheval" = "cheval",
	"chèvre" = "chèvre",
	"mouton" = "mouton",
	"lapin" = "lapin",
	"singe" = "singe",
	"rongeur" = "rongeur",
	"poisson" = "poisson",
	"amphibien" = "amphibien",
	"petit mammifère" = "petit mammifère",
	"animal de ferme" = "animal de ferme",
	"animal de compagnie exotique" = "animal de compagnie exotique",
	"animal sauvage" = "animal sauvage",
	"reptile" = "reptile",
	"insecte" = "insecte",
	"autre" = "autre",
}
export type AnimalsMaleListRecord = {
	birthday?: IsoDateString
	breed?: string
	client?: RecordIdString
	color?: string
	deathdate?: IsoDateString
	deceased?: boolean
	identifier?: string
	name?: string
	sex?: AnimalsMaleListSexOptions
	type?: AnimalsMaleListTypeOptions
	weight?: number
}

export type AnimalsMaleViewRecord = {
	total?: number
}

export type AvailableCagesRecord = {
	code?: string
}

export enum BillsMethodOptions {
	"cash" = "cash",
	"tpe" = "tpe",
	"cheque" = "cheque",
}
export type BillsRecord = {
	method?: BillsMethodOptions
	paid?: boolean
	total?: number
	total_paid?: number
	visit?: RecordIdString
}

export type CagesRecord = {
	code?: string
}

export type ClientsRecord = {
	address?: string
	email?: string
	firstname?: string
	lastname?: string
	name: string
	tel?: string
}

export type ClinicalExamsRecord = {
	code?: string
	name?: string
	price?: number
}

export enum FundTransactionsMethodOptions {
	"cash" = "cash",
	"tpe" = "tpe",
	"cheque" = "cheque",
}
export type FundTransactionsRecord = {
	amount?: number
	description?: string
	incash?: number
	method?: FundTransactionsMethodOptions
	outcash?: number
	user?: RecordIdString
}

export enum FundsExpenseListMethodOptions {
	"cash" = "cash",
	"tpe" = "tpe",
	"cheque" = "cheque",
}
export type FundsExpenseListRecord = {
	amount?: number
	description?: string
	incash?: number
	method?: FundsExpenseListMethodOptions
	outcash?: number
	user?: RecordIdString
}

export enum FundsIncomeListMethodOptions {
	"cash" = "cash",
	"tpe" = "tpe",
	"cheque" = "cheque",
}
export type FundsIncomeListRecord = {
	amount?: number
	description?: string
	incash?: number
	method?: FundsIncomeListMethodOptions
	outcash?: number
	user?: RecordIdString
}

export type HospitCompletedListRecord<Ttreatment = unknown> = {
	cage?: RecordIdString
	end?: IsoDateString
	note?: string
	price?: number
	start: IsoDateString
	treatment?: null | Ttreatment
	visit?: RecordIdString
}

export type HospitCompletedViewRecord = {
	total?: number
}

export type HospitPendingListRecord<Ttreatment = unknown> = {
	cage?: RecordIdString
	end?: IsoDateString
	note?: string
	price?: number
	start: IsoDateString
	treatment?: null | Ttreatment
	visit?: RecordIdString
}

export type HospitPendingViewRecord = {
	total?: number
}

export type HospitalisationRecord<Ttreatment = unknown> = {
	cage?: RecordIdString
	end?: IsoDateString
	note?: string
	price?: number
	start: IsoDateString
	treatment?: null | Ttreatment
	visit?: RecordIdString
}

export type InventoryItemRecord = {
	alert?: number
	code: string
	cost?: number
	description?: HTMLString
	name?: string
	price?: number
	quantity?: number
	tva?: number
}

export enum InventorySaleMethodOptions {
	"cash" = "cash",
	"tpe" = "tpe",
	"cheque" = "cheque",
}
export type InventorySaleRecord = {
	incash?: number
	item?: RecordIdString
	method?: InventorySaleMethodOptions
	outcash?: number
	quantity?: number
	seller?: RecordIdString
	total?: number
}

export type MedicalActsRecord = {
	code?: string
	name?: string
	price?: number
}

export type QueueRecord = {
	served?: boolean
	visit?: RecordIdString
}

export type SurgicalActsRecord = {
	code?: string
	name?: string
	price?: number
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type VisitsRecord = {
	actions?: HTMLString
	animal?: RecordIdString
	clinical_exams?: RecordIdString[]
	date?: IsoDateString
	doctor?: string
	files?: string[]
	hospit?: RecordIdString
	medical_acts?: RecordIdString[]
	motif?: string
	observations?: HTMLString
	store_items?: RecordIdString[]
	surgical_acts?: RecordIdString[]
	treatment?: HTMLString
	visit_price?: number
}

export type VisitsPaidListRecord = {
	animal?: RecordIdString
	motif?: string
}

export type VisitsPaidViewRecord = {
	total?: number
}

export type VisitsPartialListRecord = {
	animal?: RecordIdString
	motif?: string
}

export type VisitsPartialViewRecord = {
	total?: number
}

export type VisitsPendingListRecord = {
	animal?: RecordIdString
	motif?: string
}

export type VisitsPendingViewRecord = {
	total?: number
}

// Response types include system fields and match responses from the PocketBase API
export type AgendaResponse<Texpand = unknown> = Required<AgendaRecord> & BaseSystemFields<Texpand>
export type AnimalsResponse<Texpand = unknown> = Required<AnimalsRecord> & BaseSystemFields<Texpand>
export type AnimalsCatsListResponse<Texpand = unknown> = Required<AnimalsCatsListRecord> & BaseSystemFields<Texpand>
export type AnimalsCatsViewResponse<Texpand = unknown> = Required<AnimalsCatsViewRecord> & BaseSystemFields<Texpand>
export type AnimalsDogsListResponse<Texpand = unknown> = Required<AnimalsDogsListRecord> & BaseSystemFields<Texpand>
export type AnimalsDogsViewResponse<Texpand = unknown> = Required<AnimalsDogsViewRecord> & BaseSystemFields<Texpand>
export type AnimalsFemaleListResponse<Texpand = unknown> = Required<AnimalsFemaleListRecord> & BaseSystemFields<Texpand>
export type AnimalsFemaleViewResponse<Texpand = unknown> = Required<AnimalsFemaleViewRecord> & BaseSystemFields<Texpand>
export type AnimalsMaleListResponse<Texpand = unknown> = Required<AnimalsMaleListRecord> & BaseSystemFields<Texpand>
export type AnimalsMaleViewResponse<Texpand = unknown> = Required<AnimalsMaleViewRecord> & BaseSystemFields<Texpand>
export type AvailableCagesResponse<Texpand = unknown> = Required<AvailableCagesRecord> & BaseSystemFields<Texpand>
export type BillsResponse<Texpand = unknown> = Required<BillsRecord> & BaseSystemFields<Texpand>
export type CagesResponse<Texpand = unknown> = Required<CagesRecord> & BaseSystemFields<Texpand>
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> & BaseSystemFields<Texpand>
export type ClinicalExamsResponse<Texpand = unknown> = Required<ClinicalExamsRecord> & BaseSystemFields<Texpand>
export type FundTransactionsResponse<Texpand = unknown> = Required<FundTransactionsRecord> & BaseSystemFields<Texpand>
export type FundsExpenseListResponse<Texpand = unknown> = Required<FundsExpenseListRecord> & BaseSystemFields<Texpand>
export type FundsIncomeListResponse<Texpand = unknown> = Required<FundsIncomeListRecord> & BaseSystemFields<Texpand>
export type HospitCompletedListResponse<Ttreatment = unknown, Texpand = unknown> = Required<HospitCompletedListRecord<Ttreatment>> & BaseSystemFields<Texpand>
export type HospitCompletedViewResponse<Texpand = unknown> = Required<HospitCompletedViewRecord> & BaseSystemFields<Texpand>
export type HospitPendingListResponse<Ttreatment = unknown, Texpand = unknown> = Required<HospitPendingListRecord<Ttreatment>> & BaseSystemFields<Texpand>
export type HospitPendingViewResponse<Texpand = unknown> = Required<HospitPendingViewRecord> & BaseSystemFields<Texpand>
export type HospitalisationResponse<Ttreatment = unknown, Texpand = unknown> = Required<HospitalisationRecord<Ttreatment>> & BaseSystemFields<Texpand>
export type InventoryItemResponse<Texpand = unknown> = Required<InventoryItemRecord> & BaseSystemFields<Texpand>
export type InventorySaleResponse<Texpand = unknown> = Required<InventorySaleRecord> & BaseSystemFields<Texpand>
export type MedicalActsResponse<Texpand = unknown> = Required<MedicalActsRecord> & BaseSystemFields<Texpand>
export type QueueResponse<Texpand = unknown> = Required<QueueRecord> & BaseSystemFields<Texpand>
export type SurgicalActsResponse<Texpand = unknown> = Required<SurgicalActsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VisitsResponse<Texpand = unknown> = Required<VisitsRecord> & BaseSystemFields<Texpand>
export type VisitsPaidListResponse<Texpand = unknown> = Required<VisitsPaidListRecord> & BaseSystemFields<Texpand>
export type VisitsPaidViewResponse<Texpand = unknown> = Required<VisitsPaidViewRecord> & BaseSystemFields<Texpand>
export type VisitsPartialListResponse<Texpand = unknown> = Required<VisitsPartialListRecord> & BaseSystemFields<Texpand>
export type VisitsPartialViewResponse<Texpand = unknown> = Required<VisitsPartialViewRecord> & BaseSystemFields<Texpand>
export type VisitsPendingListResponse<Texpand = unknown> = Required<VisitsPendingListRecord> & BaseSystemFields<Texpand>
export type VisitsPendingViewResponse<Texpand = unknown> = Required<VisitsPendingViewRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	agenda: AgendaRecord
	animals: AnimalsRecord
	animals_cats_list: AnimalsCatsListRecord
	animals_cats_view: AnimalsCatsViewRecord
	animals_dogs_list: AnimalsDogsListRecord
	animals_dogs_view: AnimalsDogsViewRecord
	animals_female_list: AnimalsFemaleListRecord
	animals_female_view: AnimalsFemaleViewRecord
	animals_male_list: AnimalsMaleListRecord
	animals_male_view: AnimalsMaleViewRecord
	available_cages: AvailableCagesRecord
	bills: BillsRecord
	cages: CagesRecord
	clients: ClientsRecord
	clinical_exams: ClinicalExamsRecord
	fund_transactions: FundTransactionsRecord
	funds_expense_list: FundsExpenseListRecord
	funds_income_list: FundsIncomeListRecord
	hospit_completed_list: HospitCompletedListRecord
	hospit_completed_view: HospitCompletedViewRecord
	hospit_pending_list: HospitPendingListRecord
	hospit_pending_view: HospitPendingViewRecord
	hospitalisation: HospitalisationRecord
	inventory_item: InventoryItemRecord
	inventory_sale: InventorySaleRecord
	medical_acts: MedicalActsRecord
	queue: QueueRecord
	surgical_acts: SurgicalActsRecord
	users: UsersRecord
	visits: VisitsRecord
	visits_paid_list: VisitsPaidListRecord
	visits_paid_view: VisitsPaidViewRecord
	visits_partial_list: VisitsPartialListRecord
	visits_partial_view: VisitsPartialViewRecord
	visits_pending_list: VisitsPendingListRecord
	visits_pending_view: VisitsPendingViewRecord
}

export type CollectionResponses = {
	agenda: AgendaResponse
	animals: AnimalsResponse
	animals_cats_list: AnimalsCatsListResponse
	animals_cats_view: AnimalsCatsViewResponse
	animals_dogs_list: AnimalsDogsListResponse
	animals_dogs_view: AnimalsDogsViewResponse
	animals_female_list: AnimalsFemaleListResponse
	animals_female_view: AnimalsFemaleViewResponse
	animals_male_list: AnimalsMaleListResponse
	animals_male_view: AnimalsMaleViewResponse
	available_cages: AvailableCagesResponse
	bills: BillsResponse
	cages: CagesResponse
	clients: ClientsResponse
	clinical_exams: ClinicalExamsResponse
	fund_transactions: FundTransactionsResponse
	funds_expense_list: FundsExpenseListResponse
	funds_income_list: FundsIncomeListResponse
	hospit_completed_list: HospitCompletedListResponse
	hospit_completed_view: HospitCompletedViewResponse
	hospit_pending_list: HospitPendingListResponse
	hospit_pending_view: HospitPendingViewResponse
	hospitalisation: HospitalisationResponse
	inventory_item: InventoryItemResponse
	inventory_sale: InventorySaleResponse
	medical_acts: MedicalActsResponse
	queue: QueueResponse
	surgical_acts: SurgicalActsResponse
	users: UsersResponse
	visits: VisitsResponse
	visits_paid_list: VisitsPaidListResponse
	visits_paid_view: VisitsPaidViewResponse
	visits_partial_list: VisitsPartialListResponse
	visits_partial_view: VisitsPartialViewResponse
	visits_pending_list: VisitsPendingListResponse
	visits_pending_view: VisitsPendingViewResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'agenda'): RecordService<AgendaResponse>
	collection(idOrName: 'animals'): RecordService<AnimalsResponse>
	collection(idOrName: 'animals_cats_list'): RecordService<AnimalsCatsListResponse>
	collection(idOrName: 'animals_cats_view'): RecordService<AnimalsCatsViewResponse>
	collection(idOrName: 'animals_dogs_list'): RecordService<AnimalsDogsListResponse>
	collection(idOrName: 'animals_dogs_view'): RecordService<AnimalsDogsViewResponse>
	collection(idOrName: 'animals_female_list'): RecordService<AnimalsFemaleListResponse>
	collection(idOrName: 'animals_female_view'): RecordService<AnimalsFemaleViewResponse>
	collection(idOrName: 'animals_male_list'): RecordService<AnimalsMaleListResponse>
	collection(idOrName: 'animals_male_view'): RecordService<AnimalsMaleViewResponse>
	collection(idOrName: 'available_cages'): RecordService<AvailableCagesResponse>
	collection(idOrName: 'bills'): RecordService<BillsResponse>
	collection(idOrName: 'cages'): RecordService<CagesResponse>
	collection(idOrName: 'clients'): RecordService<ClientsResponse>
	collection(idOrName: 'clinical_exams'): RecordService<ClinicalExamsResponse>
	collection(idOrName: 'fund_transactions'): RecordService<FundTransactionsResponse>
	collection(idOrName: 'funds_expense_list'): RecordService<FundsExpenseListResponse>
	collection(idOrName: 'funds_income_list'): RecordService<FundsIncomeListResponse>
	collection(idOrName: 'hospit_completed_list'): RecordService<HospitCompletedListResponse>
	collection(idOrName: 'hospit_completed_view'): RecordService<HospitCompletedViewResponse>
	collection(idOrName: 'hospit_pending_list'): RecordService<HospitPendingListResponse>
	collection(idOrName: 'hospit_pending_view'): RecordService<HospitPendingViewResponse>
	collection(idOrName: 'hospitalisation'): RecordService<HospitalisationResponse>
	collection(idOrName: 'inventory_item'): RecordService<InventoryItemResponse>
	collection(idOrName: 'inventory_sale'): RecordService<InventorySaleResponse>
	collection(idOrName: 'medical_acts'): RecordService<MedicalActsResponse>
	collection(idOrName: 'queue'): RecordService<QueueResponse>
	collection(idOrName: 'surgical_acts'): RecordService<SurgicalActsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'visits'): RecordService<VisitsResponse>
	collection(idOrName: 'visits_paid_list'): RecordService<VisitsPaidListResponse>
	collection(idOrName: 'visits_paid_view'): RecordService<VisitsPaidViewResponse>
	collection(idOrName: 'visits_partial_list'): RecordService<VisitsPartialListResponse>
	collection(idOrName: 'visits_partial_view'): RecordService<VisitsPartialViewResponse>
	collection(idOrName: 'visits_pending_list'): RecordService<VisitsPendingListResponse>
	collection(idOrName: 'visits_pending_view'): RecordService<VisitsPendingViewResponse>
}
