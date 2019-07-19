import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
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
  renameDialog;

  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: RenameData, 
    private nodeService: NodeService) {
      this.socket = io({query: {token: localStorage.getItem('access_token')}});
      this.renameDialog = fb.group({
        id: data.id,
        name: new FormControl(null, Validators.required)
      });
    }

  ngOnInit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  onRename() {
    if(this.renameDialog.status === "VALID") {
      this.nodeService.renameNode(this.renameDialog.value, this.socket);
      this.dialogRef.close();
    }
  }

}
