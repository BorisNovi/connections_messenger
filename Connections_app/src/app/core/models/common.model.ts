export interface IGroupListResponse {
  Count: number,
  Items: IGroupItem[]
}

export interface IGroupItem {
  id: IS,
  name: IS,
  createdAt: IS,
  createdBy: IS
}

interface IS {
  S: string
}

export interface IPeopleListResponse {
  Count: number,
  Items: IPeopleItem[]
}

export interface IPeopleItem {
  uid: IS,
  name: IS,
}

export interface IConversationResponse {
  Count: number,
  Items: IConversationItem[]
}

export interface IConversationItem {
  id: IS,
  companionID: IS
}

interface IS {
  S: string
}
