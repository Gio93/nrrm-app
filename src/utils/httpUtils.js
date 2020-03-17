import axios from 'axios';
import {
    CONFIG
} from '../constants';
import {
    local
} from 'd3';

export default class API {

    constructor(history) {
        this.history = history;

        this.toast = document.createElement('ion-toast');
        this.toast.position = 'bottom';
        this.toast.buttons = [{
            text: 'Done',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
                this.toast.dismiss();
                document.body.removeChild(this.toast);
            }
        }];


    }

    doPost(url, data) {

        return axios({
            url: CONFIG.API_ENDPOINT + url,
            headers: this.getHeaders(),
            method: 'post',
            data: data

        }).then(response => {
            console.log(response);
            return response.data;
        }).catch((e) => {
            if (e.request.status === 401) {
                this.handleRedirect();
            } else {
                this.showError(e.message);
            }
        });
    };

    getHeaders() {
        return {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
        // let header = new Headers();
        // header.append("accept","application/json");
        // header.append("Authorization","Bearer "+localStorage.getItem("token"));
        // return header;
    }
    async refreshToken() {
        const accesstoken = await axios.post(`${CONFIG.API_ENDPOINT}/admin/auth/refresh`, JSON.stringify({
            "grantType": "refreshToken",
            'refreshToken': localStorage.getItem('refresh_token')
        }), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${process.env.clientsecret}`
            }
        });
        localStorage.setItem("token", accesstoken.data.accessToken);

    }
    getDate() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        console.log(dateTime);
        return dateTime.toString();
    }

    async doGet(url) {
        await this.refreshToken();
        return axios({
            headers: this.getHeaders(),
            url: CONFIG.API_ENDPOINT + url,
            method: 'get',
        }).then(response => {
            console.log(response);
            return response.data;
        }).catch((e) => {
            ////debugger;
            if (e.request.status === 401) {
                this.handleRedirect();
            } else {
                this.showError(e.message);
            }

        });
    };

    // , this.getDate()
    async doGetwithParams(url) {
        await this.refreshToken();

        return axios({
            headers: this.getHeaders(),
            // body: this.getDate(),
            url: CONFIG.API_ENDPOINT + url,
            method: 'get',
            params: {
                fecha_fin: "" + this.getDate() + ""
            }
        }).then(response => {
            console.log(response);
            return response.data;
        }).catch((e) => {
            //debugger;
            if (e.request.status === 401) {
                this.handleRedirect();
            } else {
                this.showError(e.message);
            }
        });
    };

    async doGetwithRippleFilterCard(url) {
        await this.refreshToken();

        return axios({
            headers: this.getHeaders(),
            // body: this.getDate(),
            url: CONFIG.API_ENDPOINT + url,
            method: 'get',
            params: {
                only_cards: true
            }
        }).then(response => {
            console.log(response);
            return response.data;
        }).catch((e) => {
            //debugger;
            if (e.request.status === 401) {
                this.handleRedirect();
            } else {
                this.showError(e.message);
            }
        });
    };


    async doPostwithParams(url) {
        await this.refreshToken();

        return axios({
            headers: this.getHeaders(),
            // body: this.getDate(),
            url: CONFIG.API_ENDPOINT + url,
            method: 'post',
            // data: data,
            data: {
                frontDate: "" + this.getDate() + ""
            }
        }).then(response => {
            console.log(response);
            return response.data;
        }).catch((e) => {
            //debugger;
            if (e.request.status === 401) {
                this.handleRedirect();
            } else {
                this.showError(e.message);
            }
        });
    };

    showError(message) {
        this.toast.message = message;
        document.body.appendChild(this.toast);
        this.toast.present();

    }



    handleRedirect() {
        this.history.push("/login");
    }


}