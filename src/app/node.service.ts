import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from './models/node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  signUp(newUser): Observable<any> {
    return this.http.post('/api/signup', newUser);
  }

  logIn(user): Observable<any> {
    return this.http.post('/api/login', user);
  }

  getNodes(): Observable<Node[]>{
    return this.http.get<Node[]>('/api/nodes');
  }

  addNode(newNode, socket): void{
    socket.emit('addNode', newNode);
  }

  renameNode(node, socket): void{
    socket.emit('renameNode', node);
  }

  updateNode(node, socket): void{
    socket.emit('regenerateChild', node);
  }

  deleteNode(id, socket){
    socket.emit('deleteNode', id);
  }

}
