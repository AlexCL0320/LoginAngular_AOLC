import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card'; 
import { MatTableModule } from '@angular/material/table';  
import { CommonModule } from '@angular/common';  
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { CustomPaginatorIntl } from './custom-paginator-intl'; 
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, MatPaginator],  
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class UsuariosListaComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'contraseñas', 'Imagen'];
  dataSource = new MatTableDataSource<any>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Obtener los usuarios
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource.data = this.users; // Actualizar el dataSource
        this.dataSource.paginator = this.paginator; // Conectar el paginador
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
