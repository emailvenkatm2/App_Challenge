import { TestBed, inject } from '@angular/core/testing';
import { IMessage, Message } from '../../models/message.model';
import { MessageService } from './message-service.service';
import {ProductService} from '../product-service/product-service.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('MessageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, ProductService, HttpClient, HttpHandler, DatePipe],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should return empty messages', inject([MessageService], (service: MessageService) => {
    service.clearMessages();
    service.getAllMessages().subscribe(data => {
     expect(data.length).toBe(0);
    });
  }));

  it('should push a message to messages array', inject([MessageService], (service: MessageService) => {
    service.clearMessages();
    const newMessage = new Message(1, 'hi', 'Guest User', '2:05 PM');
     service.setMessage(newMessage);
      service.getAllMessages().subscribe(data => {
       expect(data.length).toBe(1);
      });
  }));

  it('Should clear the messages when clearMessages is called',
  inject([MessageService], (service: MessageService) => {
    const newMessage = new Message(1, 'hi', 'Guest User', '2:05 PM');
    service.setMessage(newMessage);
    service.clearMessages();
      service.getAllMessages().subscribe(data => {
       expect(data.length).toBe(0);
      });
  }));

  it('should call syncProductMessages after calling sendMessage',
  inject([MessageService], (service: MessageService)  => {
    spyOn(service, 'syncProductMessages').and.callThrough();
    service.sendMessage('Hello World');
    expect(service.syncProductMessages).toHaveBeenCalled();
  })
);

it('should call getProductList in productService after calling sendMessage',
  inject([MessageService,  ProductService], (service: MessageService, productService: ProductService)  => {
    spyOn(productService, 'getProductList').and.callThrough();
    service.sendMessage('Hello World');
    expect(productService.getProductList).toHaveBeenCalled();
  })
);
});

