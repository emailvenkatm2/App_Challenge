import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessageComponent } from './chat-message.component';
import {CarouselComponent, CarouselItemElement} from '../../../shared/components/carousel/carousel.component';
import {CarouselDirective} from '../../../shared/directives/carousel.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductinfoMessageComponent } from '../productinfo-message/productinfo-message.component';
import { Message } from '../../models/message.model';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageComponent, CarouselComponent, CarouselItemElement,
                      CarouselDirective, ProductinfoMessageComponent ],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the content in message object', async(() => {
    component.messages = [];
    component.messages.push(new Message(1, 'Hello there', 'Guest User', '8:58 PM'));
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('Hello there');
  }));

  it('should be blank if mesages array is empty', async(() => {
    component.messages = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('');
  }));
});
