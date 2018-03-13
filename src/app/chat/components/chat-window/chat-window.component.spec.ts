import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatWindowComponent } from './chat-window.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatFormComponent } from '../chat-form/chat-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductinfoMessageComponent } from '../productinfo-message/productinfo-message.component';
import {CarouselComponent, CarouselItemElement} from '../../../shared/components/carousel/carousel.component';
import {MessageService, ProductService} from '../../services/';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {BaseRequestOptions, Jsonp, ResponseOptions} from '@angular/http';
import { By } from '@angular/platform-browser';
import {MockBackend} from '@angular/http/testing';
import { MockProductServiceService } from '../../services/mock-product-service/mock-product-service.service';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowComponent, ChatFormComponent, ChatMessageComponent, ProductinfoMessageComponent,
                     CarouselComponent, CarouselItemElement],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [MessageService,
         ProductService
        //  {provide: ProductService, useClass: MockProductServiceService},
        , DatePipe,
        BaseRequestOptions,
        MockBackend,
      ]
    })
    .compileComponents();
  }));

  let backend: MockBackend;
  let productService: ProductService;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(MockBackend);
    productService = TestBed.get(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Disable send button if input text is only spaces', () => {
    const chatFormElemenet: HTMLElement = fixture.nativeElement;
    // Simulate the user input with just spaces
    const inputDebugEl = fixture.debugElement.query(By.css('.message_input_text'));
    const inputNativeEl = inputDebugEl.nativeElement;
    inputNativeEl.value = '       ';
    inputNativeEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Try to get the send button
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.icon-send'));
    expect(sendBtnDebugElement).toBeNull();
  });

  it('should enable send button if user enters valid input', () => {
    const chatFormElemenet: HTMLElement = fixture.nativeElement;
    // Simulate the user input with valid text entered
    const inputDebugEl = fixture.debugElement.query(By.css('.message_input_text'));
    const inputNativeEl = inputDebugEl.nativeElement;
    inputNativeEl.value = 'Valid Text';
    inputNativeEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Try to get the send button
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.icon-send'));
    expect(sendBtnDebugElement).toBeDefined();
  });

  it('should display whatever the message the user sends from the chat input box', () => {
    const chatFormElemenet: HTMLElement = fixture.nativeElement;
    // Simulate the user input
    const inputDebugEl = fixture.debugElement.query(By.css('.message_input_text'));
    const inputNativeEl = inputDebugEl.nativeElement;
    inputNativeEl.value = 'Hello there';
    inputNativeEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Get the button element to handle the click
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.icon-send'));
    const sendBtnNativeElement = sendBtnDebugElement.nativeElement;
    sendBtnNativeElement.click();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('Hello there');
  });
});

