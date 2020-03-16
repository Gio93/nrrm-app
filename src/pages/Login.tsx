import React from 'react';
import { IonToolbar,  IonContent,   IonButton, IonInput, IonToast, IonItem, IonHeader, IonTitle, IonMenuButton, IonPage, IonList } from '@ionic/react';
// import { any } from 'prop-types';
import image from '../assets/images/logoNRM.png';
import { RouteComponentProps } from 'react-router';

import { CONFIG } from '../constants';

import './Login.css';
import videobgWebm from '../assets/video/loopWaves.webm';

type Props = { props:any };
type State = {username: string, password: string, toastState: boolean, toastMessage: string, action: string, email: string};

class LoginPage extends React.Component <Props & RouteComponentProps<any>, State> {

  constructor(props: any) {
    super(props);
    this.state = {
     username: '',
     password: '',
     toastState: false,
     toastMessage: 'Message',
     action: "Login",
     email: ''
    };           
    this.event = new CustomEvent('loggedIn', {
      detail: false
    });
    
 
  }
  event: Event;

  updateUserName = (event: any) => {
    this.setState({ username: event.detail.value });
    
  };

  updatePassword = (event: any) => {
    this.setState({ password: event.detail.value });
  };

  updateEmail = (event: any) => {
    this.setState({ email: event.detail.value });
  };
  
  toggleAction = () => {
    this.state.action === 'Login' ? this.setState({action: 'SignUp'}) : this.setState({action: 'Login'})
  }

  componentDidMount(){
    this.clearCredentials();
  
    this.props.history.listen((location, action) => {
      if(location.pathname === "/login"){
        this.clearCredentials();
      }
    })
  }

  clearCredentials(){
    console.log("Cleaning credentials...");
    this.event = new CustomEvent('loggedIn', {
      detail: false
    });
    window.dispatchEvent(this.event);   
    localStorage.removeItem("token");       
    localStorage.removeItem("username");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("email");
  }

  login2= () => {
    localStorage.setItem("token","1234");       
    localStorage.setItem("username", this.state.username);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("email", this.state.email);
   
    this.event = new CustomEvent('loggedIn', {
      detail: true,
    });
    window.dispatchEvent(this.event);
    this.props.history.replace('/');
  }

  login= () => {
    let url , credentials;     
    if(this.state.action  === 'Login'){
      url = CONFIG.API_ENDPOINT + '/admin/auth';
      credentials = {
          "username": this.state.email,
          "password": this.state.password
      }
    } else {
      url = CONFIG.API_ENDPOINT + '/auth';
      credentials = {
        "user": {
          "email": this.state.email,
          "password": this.state.password,
          "username": this.state.username
        }
      }
    }

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",              
      },
      body: JSON.stringify(credentials)
    })
    .then((res) => {
      // TO DO : real login
      if(res.status === 200 || res.status === 201){
        return res.json();
      } else {  
        if(this.state.action === 'SignUp') {
          throw new Error("Error creating user");
        } else {
          throw new Error(`Loggedin failed.  
          Please enter a valid account`)  
        }                
      }
    })
    .then(
      (result) => {
        localStorage.setItem("token",result.accessToken);       
        localStorage.setItem("refresh_token", result.refreshToken)
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("email", this.state.username);
        
        this.event = new CustomEvent('loggedIn', {
          detail: true,
        });
        window.dispatchEvent(this.event);
        this.props.history.replace('/rippleDiagram');
      },
      (error) => {
        console.error(error);           
        this.setState({toastMessage: error.toString(), toastState: true});
      })
  }

  render(){
    return(
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle class="header" >Login</IonTitle>
                  <IonMenuButton slot="start"></IonMenuButton>
              </IonToolbar>
          </IonHeader>
          <IonContent class="ion-padding">
              <video className="backgroundVideo" autoPlay loop muted webkit-playsinline="true" playsInline>
                {/* <source src={videobgMp4} type='video/mp4; codecs="h.264"' /> */}
                <source src={videobgWebm} type="video/webm" />
              </video>
              <IonToast cssClass="toast"
                isOpen={this.state.toastState}
                onDidDismiss={() => this.setState(() => ({ toastState: false }))}
                message={this.state.toastMessage}
                duration={400}
              >
              </IonToast>
              <div className="formWrapper">
                  <form action="" className="loginForm">
                      <img src={image} alt="logo" width="100%" />
                      <IonList>
                        <IonItem>
                            <IonInput onIonChange={this.updateEmail} type="email" placeholder="Email"></IonInput>
                        </IonItem>
                        {this.state.action === 'SignUp' ?
                            <IonItem>
                                <IonInput onIonChange={this.updateUserName} type="text" placeholder="Username"></IonInput>
                            </IonItem>
                        :
                            null
                        }
                        <IonItem>
                            <IonInput onIonChange={this.updatePassword} type="password" placeholder="Password" ></IonInput>
                        </IonItem>
                        <IonButton onClick={this.login} className="loginbutton">{this.state.action}</IonButton>
                      </IonList>
                  </form>
              </div>
          </IonContent>
      </IonPage>
    )
  }
}
export default LoginPage