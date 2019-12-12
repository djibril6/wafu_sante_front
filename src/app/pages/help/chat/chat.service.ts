import { Injectable } from '@angular/core';

import { botReplies, gifsLinks, imageLinks } from './bot-replies';
import { Observable } from 'rxjs';
import { Chat } from '../../../config/chat-model.config';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { VarConfig } from '../../../config/var.config';

type EntityResponseType = HttpResponse<Chat>;

@Injectable()
export class ChatService {

  chat: Chat;
  link = 'chat/';

  constructor(private httpClient: HttpClient, private gb: VarConfig) { }

  loadBotReplies() {
    return botReplies;
  }

  reply(message: string) {
    const botReply: any =  this.loadBotReplies()
      .find((reply: any) => message.search(reply.regExp) !== -1);

    if (botReply.reply.type === 'quote') {
      botReply.reply.quote = message;
    }

    if (botReply.type === 'gif') {
      botReply.reply.files[0].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
    }

    if (botReply.type === 'pic') {
      botReply.reply.files[0].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    }

    if (botReply.type === 'group') {
      botReply.reply.files[1].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
      botReply.reply.files[2].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    }

    botReply.reply.text = botReply.answerArray[Math.floor(Math.random() * botReply.answerArray.length)];
    return { ...botReply.reply };
  }

  addMessage(data) {
    const url = this.gb.MAIN_URL + this.link + 'add';
    return this.httpClient
        .post<Chat>(url, data, {observe: 'response'});
  }

  updateMessage(tel, data) {
    const url = this.gb.MAIN_URL + this.link + 'update/' + tel;
    return this.httpClient
        .patch<Chat>(url, data, {observe: 'response'});
  }
  getAllMessages(tel: string): Observable<EntityResponseType> {
    const url = this.gb.MAIN_URL + this.link + 'get/' + tel;
    return this.httpClient
        .get<Chat>(url, {observe: 'response'});
  }
}
