import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import * as io from 'socket.io-client';
import { NodeService } from '../node.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: number;
  count: number;
  lower: number;
  higher: number;
}

function rangeMatcher(c: AbstractControl) {
  return c.get('higher').value >= (c.get('lower').value + c.get('count').value) ? null : {'RangeError': true}
}

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.css']
})
export class MainDialogComponent implements OnInit {
  socket;
  mainDialog: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, 
    private nodeService: NodeService) {
      this.socket = io({query: {token: localStorage.getItem('access_token')}});
      this.mainDialog = fb.group({
        id: data.id,
        count: new FormControl(null, [Validators.required, Validators.max(15), Validators.min(0)]),
        lower: new FormControl(null, Validators.required),
        higher: new FormControl(null, Validators.required)
      }, {validators: rangeMatcher});
    }


  ngOnInit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  onGenerate() {
    if(this.mainDialog.status === "VALID") {
      this.nodeService.updateNode(this.mainDialog.value, this.socket);
      this.dialogRef.close();
    }
  }

  onDelete() {
      this.nodeService.deleteNode(this.data.id, this.socket);
      this.dialogRef.close();
  }

}
