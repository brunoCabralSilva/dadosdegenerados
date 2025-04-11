export interface IUserData {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  imageURL: string,
  description: string,
  role: string,
}

export interface IAuthenticate {
  email: string,
  displayName: string,
  photoURL: string,
  role: string,
}

export interface IDatesToAdd {
  day: string,
  init: string,
  end: string,
}

export interface IEventRegister {
  name: string, 
  dates: IDatesToAdd[],
  description: string, 
  localName: string, 
  address: string, 
  linkMaps: string, 
  imageURL: File,
}

export interface IEventRegisterWithId {
  id: string,
  name: string, 
  dates: IDatesToAdd[],
  description: string, 
  localName: string, 
  address: string, 
  linkMaps: string, 
  imageURL: string,
}