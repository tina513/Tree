import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
import * as io from 'socket.io-client';
import { Node } from '../node';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {
  socket;
  nestedTreeControl: NestedTreeControl<Node>;
  nestedDataSource: MatTreeNestedDataSource<Node>;
  nodes: Node[];
  newNode: Node = {name: null, count: null, lower: null, higher: null, children: []};

  constructor(private nodeService: NodeService, public dialog: MatDialog) { 
    this.socket = io();
    this.nestedTreeControl = new NestedTreeControl<any>(node => node.children);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    this.getNodes();
    this.socket.on('nodeAdded', ()=>{
      this.getNodes();
    });
    this.socket.on('nodeRenamed', ()=>{
      this.getNodes();
    });
    this.socket.on('childRegenerated', ()=>{
      this.getNodes();
    });
    this.socket.on('nodeDeleted', ()=>{
      this.getNodes();
    });
  }

  getNodes(){
    this.nodeService.getNodes().subscribe(data => {
      this.nestedDataSource.data = data;
    });
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  openDialog(node): void {
    const dialogRef = this.dialog.open(MainDialogComponent, {
      width: '250px',
      data: {
        id: node._id,
        count: null,
        lower: null,
        higher: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openRename(node): void {
    const dialogRef = this.dialog.open(RenameDialogComponent, {
      width: '250px',
      data: {
        id: node._id,
        name: node.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onCreateNode(newNode) {
    this.nodeService.addNode(newNode, this.socket);
  }

}
