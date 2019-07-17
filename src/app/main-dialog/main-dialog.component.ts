import { Component, OnInit, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { NodeService } from '../node.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: number;
  count: number;
  lower: number;
  higher: number;
}

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.css']
})
export class MainDialogComponent implements OnInit {
  socket;
  constructor(
    public dialogRef: MatDialogRef<MainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private nodeService: NodeService) {
      this.socket = io();
    }


  ngOnInit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  onGenerate(data) {
      this.nodeService.updateNode(data, this.socket);
      this.dialogRef.close();
  }

  onDelete(id) {
      this.nodeService.deleteNode(id, this.socket);
      this.dialogRef.close();
  }

}
