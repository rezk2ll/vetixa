/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Animals = 'animals',
	Bills = 'bills',
	Clients = 'clients',
	ClinicalExams = 'clinical_exams',
	InventoryItem = 'inventory_item',
	InventorySale = 'inventory_sale',
	MedicalActs = 'medical_acts',
	SurgicalActs = 'surgical_acts',
	Users = 'users',
	Visits = 'visits'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

export type AuthSystemFields<T = never> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export enum AnimalsSexOptions {
	'male' = 'male',
	'female' = 'female'
}

export enum AnimalsTypeOptions {
	'chien' = 'chien',
	'chat' = 'chat'
}
export type AnimalsRecord = {
	birthday?: IsoDateString;
	client?: RecordIdString;
	color?: string;
	identifier?: string;
	name?: string;
	sex?: AnimalsSexOptions;
	type?: AnimalsTypeOptions;
	weight?: number;
};

export type BillsRecord = {
	method?: string;
	paid?: boolean;
	visit?: RecordIdString;
};

export type ClientsRecord = {
	address?: string;
	email?: string;
	firstname?: string;
	lastname?: string;
	name: string;
	tel?: string;
};

export type ClinicalExamsRecord = {
	code?: string;
	name?: string;
	price?: number;
};

export type InventoryItemRecord = {
	code: string;
	cost?: number;
	description?: HTMLString;
	name?: string;
	price?: number;
	quantity?: number;
};

export type InventorySaleRecord = {
	item?: RecordIdString;
	quantity?: number;
	seller?: RecordIdString;
	total?: number;
};

export type MedicalActsRecord = {
	code?: string;
	name?: string;
	price?: number;
};

export type SurgicalActsRecord = {
	code?: string;
	name?: string;
	price?: number;
};

export type UsersRecord = {
	avatar?: string;
	name?: string;
};

export type VisitsRecord = {
	actions?: HTMLString;
	animal?: RecordIdString;
	clinical_exams?: RecordIdString[];
	date?: IsoDateString;
	medical_acts?: RecordIdString[];
	motif?: string;
	observations?: HTMLString;
	surgical_acts?: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type AnimalsResponse<Texpand = unknown> = Required<AnimalsRecord> &
	BaseSystemFields<Texpand>;
export type BillsResponse<Texpand = unknown> = Required<BillsRecord> & BaseSystemFields<Texpand>;
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> &
	BaseSystemFields<Texpand>;
export type ClinicalExamsResponse<Texpand = unknown> = Required<ClinicalExamsRecord> &
	BaseSystemFields<Texpand>;
export type InventoryItemResponse<Texpand = unknown> = Required<InventoryItemRecord> &
	BaseSystemFields<Texpand>;
export type InventorySaleResponse<Texpand = unknown> = Required<InventorySaleRecord> &
	BaseSystemFields<Texpand>;
export type MedicalActsResponse<Texpand = unknown> = Required<MedicalActsRecord> &
	BaseSystemFields<Texpand>;
export type SurgicalActsResponse<Texpand = unknown> = Required<SurgicalActsRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;
export type VisitsResponse<Texpand = unknown> = Required<VisitsRecord> & BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	animals: AnimalsRecord;
	bills: BillsRecord;
	clients: ClientsRecord;
	clinical_exams: ClinicalExamsRecord;
	inventory_item: InventoryItemRecord;
	inventory_sale: InventorySaleRecord;
	medical_acts: MedicalActsRecord;
	surgical_acts: SurgicalActsRecord;
	users: UsersRecord;
	visits: VisitsRecord;
};

export type CollectionResponses = {
	animals: AnimalsResponse;
	bills: BillsResponse;
	clients: ClientsResponse;
	clinical_exams: ClinicalExamsResponse;
	inventory_item: InventoryItemResponse;
	inventory_sale: InventorySaleResponse;
	medical_acts: MedicalActsResponse;
	surgical_acts: SurgicalActsResponse;
	users: UsersResponse;
	visits: VisitsResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'animals'): RecordService<AnimalsResponse>;
	collection(idOrName: 'bills'): RecordService<BillsResponse>;
	collection(idOrName: 'clients'): RecordService<ClientsResponse>;
	collection(idOrName: 'clinical_exams'): RecordService<ClinicalExamsResponse>;
	collection(idOrName: 'inventory_item'): RecordService<InventoryItemResponse>;
	collection(idOrName: 'inventory_sale'): RecordService<InventorySaleResponse>;
	collection(idOrName: 'medical_acts'): RecordService<MedicalActsResponse>;
	collection(idOrName: 'surgical_acts'): RecordService<SurgicalActsResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
	collection(idOrName: 'visits'): RecordService<VisitsResponse>;
};
