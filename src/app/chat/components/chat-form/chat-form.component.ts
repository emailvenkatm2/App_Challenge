import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Message,IMessage } from '../../models/message.model';
import { IUser } from './../../models/abstract-user.interface';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.sass']
})
export class ChatFormComponent implements OnInit {
  chatForm: FormGroup;
  private messageText: string;
  private messageToSend: IMessage;
  public user: IUser;

  @Output() onMessageSent = new EventEmitter<string>();
  constructor(private chatFb: FormBuilder) {
    // chatText = new FormControl();
     this.createChatForm();
  }
 
  // Creating the Chatform with Form builder
  createChatForm() {
    this.chatForm = this.chatFb.group({
      chatText: ['', Validators.required ]
    });
  }

  ngOnInit() {
    // Faking the user id may not be required for guest user.
    this.user = {id: 1};
  }

  sendMessage(message: any) {
    if (message.value.trim().length) {
      this.onMessageSent.emit(message.value);
      message.value = '';
    }
  }
}
