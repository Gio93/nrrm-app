import React from 'react';
import { IonIcon, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,  IonMenuToggle, IonLabel } from '@ionic/react';
import './Menu.css';

class Menu extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {      
      isLoggedIn: localStorage.getItem("isLogin") ? localStorage.getItem("isLogin") :"false",   
      routes:  {
        appPages: [
          // { title: 'Home', path: '/', icon: 'home' },         
        ],
        loggedInPages: [
          // { title: 'My Profile', path: '/profile/'+localStorage.getItem("username"), icon: 'person'},        
          { title: 'Ripple Road', path: '/ripple', icon: 'create' },
          { title: 'Digitalization', path: '/dgrade', icon: 'podium' },
          { title: 'Logout', path: '/login', icon: 'log-out' },
          { title: 'historicalPage', path: '/historicalChart', icon: 'stats'},


        ],
        loggedOutPages: [
          { title: 'Login', path: '/login', icon: 'log-in' },
        ]  }
    }
    window.addEventListener('loggedIn', (e: any) => {            
      this.setState({
        isLoggedIn : e['detail'].toString(),
        routes : {
          appPages: [
            // { title: 'Home', path: '/', icon: 'home' },         
          ],
          loggedInPages: [
            // { title: 'My Profile', path: '/profile/'+localStorage.getItem("username"), icon: 'person'},        
            { title: 'Ripple Road', path: '/ripple', icon: 'create' },
            { title: 'Digitalization', path: '/dgrade', icon: 'stats' },
            { title: 'Logout', path: '/login', icon: 'log-out' }
            
          ],
          loggedOutPages: [
            { title: 'Login', path: '/login', icon: 'log-in' }, 
          ]  }        
      })      
 
    });  
  } 
    
   renderMenuItem(menu: any) {
    return (
         <IonMenuToggle key={menu.title} auto-hide="false">
                   <IonItem routerLink={menu.path}>
                     <IonIcon name={menu.icon} ></IonIcon>
                     <IonLabel className="sidemenu-link customLink" >{menu.title}</IonLabel> 
                   </IonItem>
                   </IonMenuToggle>
      )
  }
  
  render() {
      return (  
        <IonMenu side="start" menuId="first" contentId="main" >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="customContent">
            <IonList>
              {this.state.routes.appPages.map((art: any) => this.renderMenuItem(art))}
              {this.state.isLoggedIn === "true" ? <> {this.state.routes.loggedInPages.map((art: any) =>
                this.renderMenuItem(art))} </> :<> {this.state.routes.loggedOutPages.map((art: any) =>
                this.renderMenuItem(art))} </> }
            </IonList>
            <div className="wrapper">
              <div className="wave"></div>
            </div>
          </IonContent>
        </IonMenu>
      )
  }
}
export default Menu