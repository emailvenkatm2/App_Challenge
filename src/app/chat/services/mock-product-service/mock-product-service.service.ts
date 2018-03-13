import { Url } from 'url';
import { Injectable } from '@angular/core';
import { ProductContent } from '../../models/product.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { APIConstants } from '../../../shared/constants';

@Injectable()
export class MockProductServiceService {
  constructor(private http: HttpClient) {}
/*
Get API Base URL
*/
getProductListBaseUrl(apikey, pageNo, productCount): string {
  return '/assets/mocks/' + pageNo + '.json';
}
/*
Get the product list based on the page number and page count
*/
getProductList(pageNo: Number, productCount: Number): Observable<ProductContent> {
  return this.http.get<any>(this.getProductListBaseUrl(APIConstants.CHAT_API_KEY, pageNo, productCount));
}
}
