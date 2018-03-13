import { Component } from '@angular/core';
import { IMessage, Message } from '../../models/message.model';
import { IUser } from './../../models/abstract-user.interface';
import { APIConstants, CustomErrorMessages } from '../../../shared/constants';
import { MessageService } from '../../services/message-service/message-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent {
  private userMessage: IMessage = null;
  private botMessage: IMessage = null;
  public user: IUser;
  public messages: Array<IMessage> = [];
  public currentPage: number;
  public messageHead = APIConstants.CHAT_API_RESPONSE_PREFIX_TEXT;
  constructor(private _messageService: MessageService, private _datepipe: DatePipe) { }
  // Method to handle when user enters text and clicks send
  onMessageSent(messageText) {
    if (messageText) {
      // Create a new message object
      this.updateMessage(messageText, APIConstants.CHAT_API_DEFAULT_USER,
        APIConstants.CHAT_API_DEFAULT_SUCCESS_MESSAGE_TYPE);
      this._messageService.sendMessage(messageText)
        .subscribe(
          res => this.handleSuccessResponse(res),
          error => {
            this.handleError(error);
            console.log('Error occured');
          },
      );
    }
  }
  /*
  Method to call when the user hits on "next five products"
  */
  getNextProducts(flag) {
    if (flag) {
      const nextPage = this._messageService.getNextPageNumber();
      this._messageService.syncProductMessages(nextPage)
        .subscribe(
          res => this.handleSuccessResponse(res),
          error => this.handleError(error),
      );
    }
  }
  /*
  Method to be triggered on succesful response
  */
  handleSuccessResponse(res) {
    /*
    Construct the new message
    */
    if (res.products) {
      const today = Date.now();
      this.updateMessage(this.messageHead, APIConstants.CHAT_API_DEFAULT_SENDER,
        APIConstants.CHAT_API_DEFAULT_SUCCESS_MESSAGE_TYPE, res.products);
    } else {
      this.handleError(res);
    }
  }
  /*
  Method which Updates the Info/Error Messages
  */
  updateMessage(content, sentBy, type, products?) {
    const id = this.messages.length + 1;
    const today = Date.now();
    const sentTime = this._datepipe.transform(today, 'shortTime');
    const newMessage = new Message(id, content, sentTime, sentBy, type, products);
    this.messages.push(newMessage);
    // Storing in Service so that if needed it can be shared
    this._messageService.setMessage(newMessage);
  }
  // Method to handle the various error codes
  private handleError(error: Response) {
    let key;
    let errContent;
    typeof (error) === 'object' ? key = error.status.toString() : key = '';
    switch (key) {
      case '404':
        errContent = CustomErrorMessages.NotFoundError.message;
        break;
      case '500':
        errContent = CustomErrorMessages.InternalServerError.message;
        break;
      case '400':
        errContent = CustomErrorMessages.BadRequestError.message;
        break;
      case '401':
        errContent = CustomErrorMessages.NotAuthorizedError.message;
        break;
      default:
        errContent = CustomErrorMessages.OtherError.message;
        break;
    }
    this.updateMessage(errContent, APIConstants.CHAT_API_DEFAULT_SENDER,
      APIConstants.CHAT_API_DEFAULT_SUCCESS_MESSAGE_TYPE
    );
  }
}
