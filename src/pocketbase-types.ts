/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Agenda = "agenda",
	Animals = "animals",
	Bills = "bills",
	Clients = "clients",
	ClinicalExams = "clinical_exams",
	FundTransactions = "fund_transactions",
	InventoryItem = "inventory_item",
	InventorySale = "inventory_sale",
	MedicalActs = "medical_acts",
	Queue = "queue",
	SurgicalActs = "surgical_acts",
	Users = "users",
	Visits = "visits",
	VisitsPaidView = "visits_paid_view",
	VisitsPartialPaidView = "visits_partial_paid_view",
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
}
export type AnimalsRecord = {
	birthday?: IsoDateString
	breed?: string
	client?: RecordIdString
	color?: string
	identifier?: string
	name?: string
	sex?: AnimalsSexOptions
	type?: AnimalsTypeOptions
	weight?: number
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
	files?: string[]
	medical_acts?: RecordIdString[]
	motif?: string
	observations?: HTMLString
	surgical_acts?: RecordIdString[]
}

export type VisitsPaidViewRecord = {
	total?: number
}

export type VisitsPartialPaidViewRecord = {
	total?: number
}

export type VisitsPendingViewRecord = {
	total?: number
}

// Response types include system fields and match responses from the PocketBase API
export type AgendaResponse<Texpand = unknown> = Required<AgendaRecord> & BaseSystemFields<Texpand>
export type AnimalsResponse<Texpand = unknown> = Required<AnimalsRecord> & BaseSystemFields<Texpand>
export type BillsResponse<Texpand = unknown> = Required<BillsRecord> & BaseSystemFields<Texpand>
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> & BaseSystemFields<Texpand>
export type ClinicalExamsResponse<Texpand = unknown> = Required<ClinicalExamsRecord> & BaseSystemFields<Texpand>
export type FundTransactionsResponse<Texpand = unknown> = Required<FundTransactionsRecord> & BaseSystemFields<Texpand>
export type InventoryItemResponse<Texpand = unknown> = Required<InventoryItemRecord> & BaseSystemFields<Texpand>
export type InventorySaleResponse<Texpand = unknown> = Required<InventorySaleRecord> & BaseSystemFields<Texpand>
export type MedicalActsResponse<Texpand = unknown> = Required<MedicalActsRecord> & BaseSystemFields<Texpand>
export type QueueResponse<Texpand = unknown> = Required<QueueRecord> & BaseSystemFields<Texpand>
export type SurgicalActsResponse<Texpand = unknown> = Required<SurgicalActsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VisitsResponse<Texpand = unknown> = Required<VisitsRecord> & BaseSystemFields<Texpand>
export type VisitsPaidViewResponse<Texpand = unknown> = Required<VisitsPaidViewRecord> & BaseSystemFields<Texpand>
export type VisitsPartialPaidViewResponse<Texpand = unknown> = Required<VisitsPartialPaidViewRecord> & BaseSystemFields<Texpand>
export type VisitsPendingViewResponse<Texpand = unknown> = Required<VisitsPendingViewRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	agenda: AgendaRecord
	animals: AnimalsRecord
	bills: BillsRecord
	clients: ClientsRecord
	clinical_exams: ClinicalExamsRecord
	fund_transactions: FundTransactionsRecord
	inventory_item: InventoryItemRecord
	inventory_sale: InventorySaleRecord
	medical_acts: MedicalActsRecord
	queue: QueueRecord
	surgical_acts: SurgicalActsRecord
	users: UsersRecord
	visits: VisitsRecord
	visits_paid_view: VisitsPaidViewRecord
	visits_partial_paid_view: VisitsPartialPaidViewRecord
	visits_pending_view: VisitsPendingViewRecord
}

export type CollectionResponses = {
	agenda: AgendaResponse
	animals: AnimalsResponse
	bills: BillsResponse
	clients: ClientsResponse
	clinical_exams: ClinicalExamsResponse
	fund_transactions: FundTransactionsResponse
	inventory_item: InventoryItemResponse
	inventory_sale: InventorySaleResponse
	medical_acts: MedicalActsResponse
	queue: QueueResponse
	surgical_acts: SurgicalActsResponse
	users: UsersResponse
	visits: VisitsResponse
	visits_paid_view: VisitsPaidViewResponse
	visits_partial_paid_view: VisitsPartialPaidViewResponse
	visits_pending_view: VisitsPendingViewResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'agenda'): RecordService<AgendaResponse>
	collection(idOrName: 'animals'): RecordService<AnimalsResponse>
	collection(idOrName: 'bills'): RecordService<BillsResponse>
	collection(idOrName: 'clients'): RecordService<ClientsResponse>
	collection(idOrName: 'clinical_exams'): RecordService<ClinicalExamsResponse>
	collection(idOrName: 'fund_transactions'): RecordService<FundTransactionsResponse>
	collection(idOrName: 'inventory_item'): RecordService<InventoryItemResponse>
	collection(idOrName: 'inventory_sale'): RecordService<InventorySaleResponse>
	collection(idOrName: 'medical_acts'): RecordService<MedicalActsResponse>
	collection(idOrName: 'queue'): RecordService<QueueResponse>
	collection(idOrName: 'surgical_acts'): RecordService<SurgicalActsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'visits'): RecordService<VisitsResponse>
	collection(idOrName: 'visits_paid_view'): RecordService<VisitsPaidViewResponse>
	collection(idOrName: 'visits_partial_paid_view'): RecordService<VisitsPartialPaidViewResponse>
	collection(idOrName: 'visits_pending_view'): RecordService<VisitsPendingViewResponse>
}
