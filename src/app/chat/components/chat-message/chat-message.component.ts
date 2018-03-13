
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMessage } from '../../models/message.model';
import { IUser } from './../../models/abstract-user.interface';
import {APIConstants} from '../../../shared/constants';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.sass']
})

export class ChatMessageComponent implements OnInit {
  public user: IUser;
  public isEnabled = true;
  @Input() messages: Array<IMessage>;
  @Output() isNextClicked = new EventEmitter<Boolean>();
  public systemUser = APIConstants.CHAT_API_DEFAULT_SENDER;
  constructor() { }
  ngOnInit() {
  }

/*
  Invoked when user clicks on next 5 items.
*/
getNextProducts() {
  this.isNextClicked.emit(true);
}

/*
Checks if the message sent was from user or server.
*/
isSystemUser(message) {
  return message.sentBy === this.systemUser;
}
}
