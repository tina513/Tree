import { Component, OnInit, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { NodeService } from '../node.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RenameData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {
  socket;
  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameData, 
    private nodeService: NodeService) {
      this.socket = io();
    }

  ngOnInit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  onRename(data) {
      this.nodeService.renameNode(data, this.socket);
      this.dialogRef.close();
  }

}
