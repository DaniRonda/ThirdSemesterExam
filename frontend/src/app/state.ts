import { Injectable } from "@angular/core";
import {Order, User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class State{
  public orders: Order[] = [];
  public currentOrder: Order = {};

  public users: User[] = [];
  public currentUser: User = {}
}
