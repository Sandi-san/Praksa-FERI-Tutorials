export interface UserData {
  id: string
  first_name?: string
  last_name?: string
  email: string
  avatar?: string
  //npr. admin
  role?: { id: string; name: string }
}
