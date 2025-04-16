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

export interface IEventUpdateWithId {
  id: string,
  name: string, 
  dates: IDatesToAdd[],
  description: string, 
  localName: string, 
  address: string, 
  linkMaps: string, 
  imageURL: string | File,
}

export interface IActivityRegister {
  eventId: string,
  name: string,
  typeActivity: string,
  systemSession: ISystemToAdd,
  slots: number,
  noSlots: boolean,
  dates: IDatesToAdd[],
  description: string,
  sensibility: string,
}

export interface IActivityRegisterWithId {
  id: string,
  eventId: string,
  name: string,
  typeActivity: string,
  systemSession: ISystemToAdd,
  slots: number,
  noSlots: boolean,
  dates: IDatesToAdd[],
  description: string,
  sensibility: string,
}

export interface ISystemToAdd {
  name: string,
  description: string,
}
