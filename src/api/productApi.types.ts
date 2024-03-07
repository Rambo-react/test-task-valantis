export interface GetFilteredIdListRequestType {
  product?: string
  brand?: string
  price?: number
}

export interface GetIdsRequesType {
  offset?: number
  limit?: number
}

export interface GetFieldsRequesType {
  field?: string
  offset?: number
  limit?: number
}

export interface GetItemsRequestType {
  ids: Array<string>
}
export type ActionType = 'get_ids' | 'get_items' | 'get_fields' | 'filter'

export type ResponseType = Array<string>

export type ProductItemType = {
  id: string
  product: string
  price: number
  brand: string | null
}
