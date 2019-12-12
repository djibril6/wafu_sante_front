import { Component } from '@angular/core';

import { ChatService } from './chat.service';
import { VarConfig } from '../../../config/var.config';
import { Chat } from '../../../config/chat-model.config';

@Component({
  selector: 'ngx-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ ChatService ],
})
export class ChatComponent {

  messages: any[];
uneDate = new Date();
chat: any = {};

  constructor(protected chatService: ChatService, private vg: VarConfig) {
    this.messages = [];
    if (this.vg.user) {
      this.chatService.getAllMessages(this.vg.user.response.tel)
      .subscribe((res) => {
        this.chat = res.body;
        if (res.body.success) {
          this.messages = res.body.response.messages;
        }
      });
    }
  }

  sendMessage(event: any) {
    let tel = 'user';
    if (this.vg.user) {
        tel = this.vg.user.response.tel;
    }
    this.messages.push({
      user: {
        name: tel,
        avatar: 'https://i.gifer.com/no.gif',
      },
      text: event.message,
      reply: true,
      date: this.uneDate.toString(),
    });
    const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => {
        this.messages.push(botReply);
        if (this.chat.success) {
          const data = {
            messages: this.messages,
          };
          if (this.vg.user) {
            this.chatService.updateMessage(this.vg.user.response.tel, data)
            .subscribe((res) => {
              // tslint:disable-next-line: no-console
              console.log(res.body);
            });
          }
        } else {
          if (this.vg.user) {
            const data = {
              user: this.vg.user.response.tel,
              messages: this.messages,
            };
            this.chatService.addMessage(data)
            .subscribe((res) => {
              // tslint:disable-next-line: no-console
              console.log(res.body);
            });
          }
        }
      }, 500);
    }
  }
}
