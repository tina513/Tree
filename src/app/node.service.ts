import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from './node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getNodes(): Observable<Node[]>{
    return this.http.get<Node[]>('http://localhost:3000/api/nodes');
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
