import { Component, OnInit, Input } from '@angular/core';
import {IMessage} from '../../models/message.model';
import {APIConstants} from '../../../shared/constants/api-endpoint.settings';

@Component({
  selector: 'app-productinfo-message',
  templateUrl: './productinfo-message.component.html',
  styleUrls: ['./productinfo-message.component.sass']
})
export class ProductinfoMessageComponent implements OnInit {
  public products: Array<any>;
  @Input() message: IMessage;
  constructor() {
  }
  ngOnInit() {
  }
}
