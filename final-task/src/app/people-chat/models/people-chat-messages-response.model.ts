export interface IPeopleMessagesResponse {
  Count: number,
  Items: IPeopleMessageItem[]
}

export interface IPeopleMessageItem {
  authorID: IS,
  message: IS,
  createdAt: IS
}

interface IS {
  S: string
}
