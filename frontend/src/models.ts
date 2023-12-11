import {Time} from "@angular/common";

export class Order{
  OrderId?: number;
  OrderDate?: Date;
  OrderIsDone?: boolean;
  OrderItemArray?: string[];
  OrderTime?: Time;

}
export class ResponseDto<T>{
  responseData?: T;
  messageToClient?: string;
}
