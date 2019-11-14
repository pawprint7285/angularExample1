import { Component, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from './server.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  servers: any[] = [];
  @ViewChild('serverName', {static: false}) serverName: ElementRef;

  constructor(private serverService: ServerService){}

  onGetServer(){
    this.serverService.getServers()
      .subscribe(
        (server: any[]) =>this.servers = server,
        (error) => console.log(error)
      );
  }

  onAddServer(name: string){
    this.servers.push({
      name: name, 
      active: true
    });
    this.serverName.nativeElement.value="";
  }

  onSave(){
    this.serverService.saveServers(this.servers)
      .subscribe(
        () => alert('Save Successful'),
        (error) => console.log(error)
      )
  }

  onPatchServer(index: number){
    if(this.servers[index].active){
      this.servers[index].active = false;
    } else {
      this.servers[index].active = true;
    }
    this.serverService.updateServer(index, this.servers[index])
    .subscribe(
      (response) => console.log(response),
      error => console.log(error)
    )
  }

  onDeleteServer(){
    let index: number = this.servers.length - 1;
    this.serverService.deleteServer(index)
    .subscribe(
      () => this.onGetServer(),
      error => console.log(error)
    )
  }

  onSearch(input: string){
    let searchIndex;
    for(let i = 0; i < this.servers.length; i++){
      if(this.servers[i].name == input){
        searchIndex = i;
        break;
      }
    }
    this.servers = [];
    this.serverService.searchServer(searchIndex)
      .subscribe(
        (server: Object) => this.servers.push(server),
        error => console.log(error)
      )
  }
}
