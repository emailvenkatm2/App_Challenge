import { Message } from './models/message.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ProductService } from './services/';
import { ProductinfoMessageComponent } from './components/productinfo-message/productinfo-message.component';
import {CarouselComponent,CarouselItemElement} from '../shared/components/carousel/carousel.component';
import {CarouselDirective} from '../shared/directives/carousel.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {MockProductServiceService} from './services/mock-product-service/mock-product-service.service';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [ChatWindowComponent, ChatMessageComponent, ChatFormComponent,
  ProductinfoMessageComponent, CarouselComponent, CarouselDirective, CarouselItemElement],
  providers: [
    MessageService,
    ProductService,
    // Un comment when mock needed
  // {provide: ProductService, useClass: MockProductServiceService},
    DatePipe]
})
export class ChatModule { }
