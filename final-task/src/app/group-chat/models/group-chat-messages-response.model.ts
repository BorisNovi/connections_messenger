export interface IGroupMessagesResponse {
  Count: number,
  Items: IGroupMessageItem
}

export interface IGroupMessageItem {
  authorID: IS,
  message: IS,
  createdAt: IS
}

interface IS {
  S: string
}
