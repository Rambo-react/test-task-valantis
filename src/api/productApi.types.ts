export interface FieldsType {
  product?: string
  brand?: string
  price?: number
}

export interface GetIdsParamsType {
  offset?: number
  limit?: number
}

export type ActionType = 'get_ids' | 'get_items' | 'get_fields' | 'filter'

export type ResponseType = Array<string>

export type ProductItemType = {
  id: string
  product: string
  price: number
  brand: string | null
}

export interface GetItemsRequestType {
  ids: Array<string>
}

export interface GetFieldParamsType {
  field?: string
  offset?: number
  limit?: number
}
