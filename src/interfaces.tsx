export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageURL: string;
  description: string;
  role: string;
}

export interface IAuthenticate {
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
}

export interface IDatesToAdd {
  day: string;
  init: string;
  end: string;
}

export interface IEventRegister {
  name: string; 
  dates: IDatesToAdd[];
  description: string; 
  localName: string; 
  address: string; 
  linkMaps: string; 
  imageURL: File;
}

export interface IEventRegisterWithId {
  id: string;
  name: string; 
  dates: IDatesToAdd[];
  description: string; 
  localName: string; 
  address: string; 
  linkMaps: string; 
  imageURL: string;
}

export interface IEventUpdateWithId {
  id: string;
  name: string; 
  dates: IDatesToAdd[];
  description: string; 
  localName: string; 
  address: string; 
  linkMaps: string; 
  imageURL: string | File;
}

export interface IActivityRegister {
  eventId: string;
  name: string;
  dm: string;
  typeActivity: string;
  systemSession: ISystemToAdd;
  spots: number;
  availableSpots: number;
  noSpots: boolean;
  dates: IDatesToAdd[];
  description: string;
  sensibility: string;
}

export interface IActivityRegisterWithId {
  id: string;
  eventId: string;
  name: string;
  dm: string;
  typeActivity: string;
  systemSession: ISystemToAdd;
  spots: number;
  availableSpots: number;
  noSpots: boolean;
  dates: IDatesToAdd[];
  description: string;
  sensibility: string;
}

export interface ISystemToAdd {
  name: string;
  description: string;
}

export interface ISubscribe {
  age: number;
  lastName: string;
  whatsapp: string;
  firstName: string;
  email: string;
  idEvent: string;
  activityId: string[];
  waitlist: boolean;
  whatsappGroup: boolean;
}

export interface ISubscribeToAdd {
  age: number;
  lastName: string;
  whatsapp: string;
  firstName: string;
  email: string;
  idEvent: string;
  whatsappGroup: boolean;
}

export interface ISubscribeWithId {
  id: string;
  age: number;
  lastName: string;
  whatsapp: string;
  firstName: string;
  email: string;
  idEvent: string;
  waitlist: boolean;
  activityId: string;
  order: number;
  whatsappGroup: boolean;
}

export interface IBlog {
  text: string;
  title: string;
  imageURL: File;
  author: string;
}

export interface IBlogWithId {
  id: string;
  text: string;
  title: string;
  imageURL: string;
  date: string;
  author: string;
}

export interface IBlogUpdateWithId {
  id: string;
  text: string;
  title: string;
  imageURL: string | File;
  author: string;
}
