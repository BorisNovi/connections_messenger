export interface IGroupListResponse {
  Count: number,
  Items: IGroupItem[]
}

interface IGroupItem {
  id: IS,
  name: IS,
  createdAt: IS,
  createdBy: IS
}

interface IS {
  S: string
}
