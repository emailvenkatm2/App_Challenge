import { Injectable } from '@angular/core';
import { IMessage, Message } from '../../models/message.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product-service/product-service.service';
import { APIConstants } from '../../../shared/constants';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ProductContent } from '../../models/product.interface';

@Injectable()
export class MessageService {

  /*
  Faking the real API calls by using InMemory Data in messages Array.
  This will be shared primarily among chat components.
  */
  private messages: IMessage[];
  private currentPage = APIConstants.CHAT_API_DEFAULT_PAGE_NUMBER;
  constructor(private _productService: ProductService, private _http: HttpClient) {
    this.messages = [];
  }
  /*
  Method makes a real api call to product list endpoint to fetch the results.
  */
  sendMessage(message: string): Observable<ProductContent> {
    // User message has been updated now sync the Product Messages
    return this.syncProductMessages(APIConstants.CHAT_API_DEFAULT_PAGE_NUMBER, APIConstants.CHAT_API_DEFAULT_ITEM_COUNT);
  }
  /*
   No need to pass the Messages Object in real application as this will be a real API call
  */
  getAllMessages(): Observable<IMessage[]> {
    console.log(this.messages);
    return Observable.of(this.messages);
  }

  /*
  Method to push a neew message to the Array<IMessage> Object
 */
  setMessage(message: IMessage): void {
  this.messages.push(message);
  }
  /*
  Method to clear all the existing messages
 */
  clearMessages(): void {
  this.messages = [];
  }
 /*
 Method used to invoke _productService to get the latest products
 */
syncProductMessages(pageNo: number, itemCount: number=
  APIConstants.CHAT_API_DEFAULT_ITEM_COUNT): Observable<ProductContent> {
   return this._productService.getProductList(pageNo, itemCount);
}

/*
Keep track of the current page number and increment it when user clicks on next 5 products
*/

getNextPageNumber() {
   this.currentPage = this.currentPage + 1;
   return(this.currentPage);
}
}
