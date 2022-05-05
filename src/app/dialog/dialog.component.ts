import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  patientForm!: FormGroup;
  actionBtn : string = "Save";
  constructor(
    private fb:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      nom : ['',Validators.required],
      prenom : ['',Validators.required],
      sexe : ['',Validators.required],
      dateNaiss : ['',Validators.required],
      age : [0,Validators.required],
      mobile: [0,Validators.required],
      servi : [false,Validators.required] 
    });
    if(this.editData){
      this.actionBtn = 'Update';
      this.patientForm.controls['nom'].setValue(this.editData.nom);
      this.patientForm.controls['prenom'].setValue(this.editData.prenom);
      this.patientForm.controls['sexe'].setValue(this.editData.sexe);
      this.patientForm.controls['dateNaiss'].setValue(this.editData.dateNaiss);
      this.patientForm.controls['age'].setValue(this.editData.age);
      this.patientForm.controls['tour'].setValue(this.editData.tour);
    }
  }
  saveAttentPatient(){

    if(!this.editData){
      if(this.patientForm.valid){
        this.api.postPatAttente(this.patientForm.value).subscribe({
          next:(res)=>{
            alert("Patient ajoutre avec succés");
            this.patientForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert("probléme lors de l(ajout du patient")
          }
        })
      }
    }else{
      this.UpdateAttentPatient();
    }

  }
  UpdateAttentPatient() {
    this.api.putPatEnAttente(this.patientForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Attente Mise à Jour avec Succés");
        this.patientForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Attente Mise n'a pas  Réiussi"); 
      }
    })
  }
}
