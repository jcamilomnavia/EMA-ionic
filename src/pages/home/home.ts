import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { stringify } from 'querystring';

declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

messages: any[]=[];
text: string="";
@ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public ngZone: NgZone) {
    this.messages.push({
      text: "Soy EMA, como te puedo ayudar?",
      sender: "api"

})
    this.messages.push({
      text: "Hola!",
      sender: "me"

})

  }

  sendText(){
    let message=this.text;

    this.messages.push({
      text: message,
      sender: "me"
    });
    this.content.scrollToBottom(200);
    this.text="";

    window["ApiAIPlugin"].requestText({
      query: message
    },  (response)=>{

      this.ngZone.run(()=>{
        this.messages.push({
          text: response.result.fulfillment.speech,
          sender:"api"
        });
        this.content.scrollToBottom(400);
      })

      
    }, (error)=>{
      alert(JSON.stringify(error));
    }
    
  )}

  sendVoice(){
    window["ApiAIPlugin"].requestVoice({},
      (response)=>{

        this.ngZone.run(()=>{
          this.messages.push({
            text: response.result.fulfillment.speech,
            sender:"api"
          });
          this.content.scrollToBottom(200);
        })
  
        
      }, (error)=>{
        alert(JSON.stringify(error));
      }
    )
  }

}
