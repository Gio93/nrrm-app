import axios from 'axios';
import { CONFIG } from '../constants';

export default class API {

    constructor(history){
        this.history = history;

        this.toast = document.createElement('ion-toast');
        this.toast.position = 'bottom';
        this.toast.buttons = [
        {
            text: 'Done',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
                this.toast.dismiss();
                document.body.removeChild(this.toast);
            }
        }
        ];
    
        
    }

 doPost (url, data){
    
    return axios({
        url: CONFIG.API_ENDPOINT+url,
        headers : this.getHeaders(),
        method: 'post',
        data:data
        
      }).then(response => {
        console.log(response);
        return response.data;
      }).catch((e)=>{
        if(e.request.status === 401){
            this.handleRedirect();
          }else{
            this.showError(e.message);
          }
      });
};

 getHeaders  (){
     return {
         "Content-type":"application/json",
         "Accept":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("token")
     }
    // let header = new Headers();
    // header.append("accept","application/json");
    // header.append("Authorization","Bearer "+localStorage.getItem("token"));
    // return header;
}

getDate() {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;
  console.log(dateTime);
   return {
    "fecha_fin":{dateTime}
   }       
}

 doGet(url){
    return axios({
        headers : this.getHeaders(),
        url: CONFIG.API_ENDPOINT+url,
        method: 'get',
      }).then(response => {
        console.log(response);
        return response.data;
      }).catch((e)=>{
          debugger;
          if(e.request.status === 401){
            this.handleRedirect();
          }else{
            this.showError(e.message);
          }
        
    });
};

// , this.getDate()
doGetwithParams(url){
  return axios({
      headers : this.getHeaders(),
      // body: this.getDate(),
      url: CONFIG.API_ENDPOINT+url,
      method: 'get',
      params: {
        fecha_fin: this.getDate()
      }
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch((e)=>{
        debugger;
        if(e.request.status === 401){
          this.handleRedirect();
        }else{
          this.showError(e.message);
        }      
  });
};


doPostwithParams(url){
  return axios({
      headers : this.getHeaders(),
      // body: this.getDate(),
      url: CONFIG.API_ENDPOINT+url,
      method: 'post',
      params: {
        fecha_fin: this.getDate()
      }
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch((e)=>{
        debugger;
        if(e.request.status === 401){
          this.handleRedirect();
        }else{
          this.showError(e.message);
        }      
  });
};

showError(message){
    this.toast.message=message;
    document.body.appendChild(this.toast);
    this.toast.present();
    
}



 handleRedirect(){
    this.history.push("/login");
}


}
