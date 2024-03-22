import { ObjectId } from "mongodb";

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface UserInfoType {
  _id?: ObjectId;
  loginId?: string;
  nickname: string;
  password: string;
  email: string;
  method?: string;
  id?: string;
  image?: string;
  emailVerified?: string;
  role?: string;
}

export interface PlaceType {
  _id?: string | ObjectId;
  location?: string;
  openhour?: string | null;
  closehour?: string | null;
  businessday?: string[] | null;
  phone?: string | null;
  howtouse?: string | null;
  desc?: string | null;
  address_name?: string | null;
  category_group_code?: string | null;
  category_group_name?: string | null;
  category_name?: string | null;
  id?: string | null;
  place_name?: string | null;
  place_url?: string | null;
  road_address_name?: string | null;
  x?: string | null;
  y?: string | null;
  status?: string | null;
  date: string;
  url?: string;
}

export interface PlacePictureType {
  _id: ObjectId;
  place_id: string;
  url: string;
}

export interface ReviewType {
  _id: string | ObjectId;
  placeid: string | ObjectId;
  content: string;
  date: Date | string;
  writerid: string | ObjectId;
  placename: string;
  writernickname: string;
  writerpic: string | null;
  star: number;
  like: number;
}

export interface AlarmType {
  map: any;
  _id: string | ObjectId;
  check: boolean;
  content: string;
  date: Date;
  link: string;
  receiver: string | ObjectId;
}

export interface LikePlace {
  _id: ObjectId | string;
  place_id: string;
  liked_user: string;
}

export interface ContactType {
  _id: ObjectId;
  email: string;
  title: string;
  date: Date;
  content: string;
  status: string;
  reply: string;
}
