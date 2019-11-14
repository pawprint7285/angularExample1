import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ServerService{
    apiRoot: string = "https://http-fed-1902.firebaseio.com/servers";
    jsonAddon: string = ".json";

    constructor(private http: HttpClient){}

    getServers(){
        return this.http.get(`${this.apiRoot}${this.jsonAddon}`);
    }

    saveServers(servers: any[]){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(`${this.apiRoot}${this.jsonAddon}`, servers, {headers});
    }

    updateServer(index, server){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.patch(`${this.apiRoot}/${index}/${this.jsonAddon}`, server, {headers});
    }

    deleteServer(index){
        return this.http.delete(`${this.apiRoot}/${index}/${this.jsonAddon}`);
    }

    searchServer(searchIndex){
        return this.http.get(`${this.apiRoot}/${searchIndex}/${this.jsonAddon}`);
    }
}