import {Time} from "@angular/common";

export class Order{
  orderId?: number;
  orderDate?: Date;
  orderIsDone?: boolean;
  orderItemArrayId?: string[];
  orderTime?: Time;

}
export class User{
  userId?: string;
  username?: string;
  password?: string;
  role?: string;
}
export class Item{
  ItemId?: number;
 ItemName?: string;
 ItemUrlImg?: string;
 ItemPrice?: number;
 ItemOptions?: string[];
}
export class ResponseDto<T>{
  responseData?: T;
  messageToClient?: string;


}
