import { TestBed, inject } from '@angular/core/testing';
import { ProductService } from './product-service.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { APIConstants } from '../../../shared/constants';
import { MockProductServiceService } from '../mock-product-service/mock-product-service.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
         {provide: ProductService, useClass: MockProductServiceService},
          HttpClient, DatePipe],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
  });

  it('should be created', inject([ProductService, HttpClient], (service: ProductService, _http: HttpClient ) => {
    expect(service).toBeTruthy();
  }));

  it('should call getProductListBaseUrl when getProductList is called',
   inject([ProductService, HttpClient], (service: ProductService, _http: HttpClient ) => {
    spyOn(service, 'getProductListBaseUrl').and.callThrough();
    service.getProductList(1, 5);
    expect(service.getProductListBaseUrl).toHaveBeenCalledWith(APIConstants.CHAT_API_KEY, 1, 5);
  }));

  it('should be return valid response from mock api',
    inject([ProductService, HttpClient], (service: ProductService, _http: HttpClient ) => {
    service.getProductList(1, 5).subscribe(data => {
      expect(data.products[0].productId).toBe('0150f9b5-8918-4fd1-92b3-fc032cc6c684');
     });
  }));
});
