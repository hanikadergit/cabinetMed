import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PatAttente } from './model/patattente.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'cabinet';
  displayedColumns: string[] = ['nom', 'prenom', 'sexe','dateNaiss', 'age', 'tour', 'actions'];
  patattente!: PatAttente;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog, private api:ApiService){    
  }
  ngOnInit(): void {
    this.getAllPatEnAttent();
  }
;
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllPatEnAttent(); 
      }
    })
  }
  getAllPatEnAttent(){
    this.api.getAllPatAttente().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("erreur lors de recherche des patients en fille d'attente ")
      }
    })

  }
  editPatEnAttent(row:any){
    this.dialog.open(DialogComponent, {
      width:'30%',
      data : row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllPatEnAttent(); 
      }
    })
  }
  deletePatEnAttent(id:number){
    this.api.deletePatEnAttente(id)
    .subscribe({
      next : (res) => {
        alert("Suppression avec succées")
      },
      error:() => {
        alert("Suppression Non Réuissite!");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
