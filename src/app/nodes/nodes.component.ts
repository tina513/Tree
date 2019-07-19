import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { NodeService } from '../node.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { Node } from '../models/node';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';

function rangeMatcher(c: AbstractControl) {
  return c.get('higher').value >= (c.get('lower').value + c.get('count').value) ? null : {'RangeError': true}
}

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {
  socket;
  nestedTreeControl: NestedTreeControl<Node>;
  nestedDataSource: MatTreeNestedDataSource<Node>;
  createNodeForm: FormGroup;
  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel;

  constructor(private nodeService: NodeService, public dialog: MatDialog, private fb: FormBuilder, private router: Router) { 
    this.socket = io({query: {token: localStorage.getItem('access_token')}});
    this.nestedTreeControl = new NestedTreeControl<any>(node => node.children);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.createNodeForm = fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern("^[a-zA-Z0-9]+$")]),
      count: new FormControl(null, [Validators.required, Validators.max(15), Validators.min(1)]),
      lower: new FormControl(null, Validators.required),
      higher: new FormControl(null, Validators.required)
    }, {validators: rangeMatcher});
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
      width: '400px',
      height: '350px',
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
      height: '250px',
      width: '400px',
      data: {
        id: node._id,
        name: node.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onCreateNode() {
    if(this.createNodeForm.status === "VALID") {
      this.nodeService.addNode(this.createNodeForm.value, this.socket);
      this.matExpansionPanel.close();
    }
  }

  logOut(){
    localStorage.removeItem('access_token');
    this.socket.emit('end');
    this.socket.disconnect();
    this.router.navigate(['']);
  }

}
