import { Injectable } from "@angular/core";
import {Order} from "../models";

@Injectable({
  providedIn: 'root'
})
export class State{
  public orders: Order[] = [];
  public currentOrder: Order = {};
}
