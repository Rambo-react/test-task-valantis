export interface DefaultSettingsType {
  filterValue: string | number
  selectedOption: string
  currentPage: number
  limitPage: number
  portionSize: number
}

export type UseAppType = (defaultSettings: DefaultSettingsType) => {
  getIdList: () => void
  setSettings: React.Dispatch<React.SetStateAction<DefaultSettingsType>>
  isLoading: boolean
  isError: boolean
  error: unknown
  currentIdList: Array<string>
  totalPages: number
  currentPage: number
  portionSize: number
  filterValue: string | number
  selectedOption: string
}
