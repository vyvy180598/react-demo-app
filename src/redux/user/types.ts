export type User = {
  id: string
  name: string
  email: string
  songs?: string[]
}

export interface IUsers {
  value: User[]
  item: User | undefined
}
