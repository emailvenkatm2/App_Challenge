/*
Model for Message text displayed when user send/receives a message
*/
import { IUser } from './abstract-user.interface';
import { IProduct } from './product.interface';

export interface IMessage {
id: number;
content: string; // Will be string for user, list of products for API
sentTime: string| Date;
sentBy: IUser|string;
status: string;
products?: IProduct[];
type?: 'info' | 'error';
}
/*
  Class for representing Message Object.
*/
export class Message implements IMessage {
    public id;
    public content;
    public sentTime;
    public sentBy;
    public status;
    public products;
    public type;

    constructor(id: number, content: string , sentTime: string| Date, sentBy: IUser|string,
        type: 'info' | 'error'= 'info', products?: IProduct[]
    ) {
    this.id = id;
    this.content = content;
    this.sentBy = sentBy;
    this.sentTime = sentTime;
    this.status = status;
    this.products = products;
    this.type = type;
    }
}
