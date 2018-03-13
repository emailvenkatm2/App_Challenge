import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatFormComponent } from './chat-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ChatFormComponent', () => {
  let component: ChatFormComponent;
  let fixture: ComponentFixture<ChatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFormComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ChatForm Component', () => {
    expect(component).toBeTruthy();
  });

  it('should enable send button only when user enters valid input', () => {
    const chatFormElemenet: HTMLElement = fixture.nativeElement;
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.sendBtn'));
    expect(sendBtnDebugElement).toBeNull();
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
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.sendBtn'));
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
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.sendBtn'));
    expect(sendBtnDebugElement).toBeDefined();
  });

  it('should call sendMessage after the clicking the send button', () => {
    const chatFormElemenet: HTMLElement = fixture.nativeElement;
    // Simulate the user input
    const inputDebugEl = fixture.debugElement.query(By.css('.message_input_text'));
    const inputNativeEl = inputDebugEl.nativeElement;
    inputNativeEl.value = 'Hello';
    inputNativeEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Get the button element to handle the click
    const sendBtnDebugElement = fixture.debugElement.query(By.css('.icon-send'));
    const sendBtnNativeElement = sendBtnDebugElement.nativeElement;
    spyOn(component, 'sendMessage').and.callThrough();
    // Trigger Click
    sendBtnNativeElement.click();
    expect(component.sendMessage).toHaveBeenCalled();
  });
});
