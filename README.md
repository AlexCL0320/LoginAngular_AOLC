![image](https://github.com/user-attachments/assets/c074e164-ebb7-4a6e-8df2-d2124bb6552e)# Login Validacion de Usuarios - Alexis Oswaldo Lopez Carreño

Generación de un login que solicite al usuario ingresar correo electronico y contraseña, estos datos se verificaran con la lista de usuarios consumidos por la api; si el correo electronico y password coincide con algun usario se permitira el acceso a la ventana home, caso contrario se mostrara una alerta con el mensaje "Usuario Invalido"
Proyecto Generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

## Explicacion de la Practica 

Para comenzar  con el desarrollo de la practica es necesario contar con algunos  requisitos de instalacioón previos a la ejecución del repositorio

### Requisitos Previos
1.- IDE de desarrollo (VS CODE)

2.- Instalación del Framework ANGULAR CLI vs 18.2.10

3.- Instalación de librerias npm

4.- Instalación de librerias boostrap

5.- Instalación de libreria ngx pagination

6.- Instalación de Material Desing (Para la incorporación de componentes)

Para poder ejecutar de forma correcta el contenido del repositorio en tu computador es necesario que una vez clonado el repositorio en tu area de trabajo se realice la instalción de las librerias anteriormente mencionadas a traves de tu entorno de desarrollo (IDE).

## Desarollo de la Practica 

### 1.- Creación del Proyecto
Para comenzar a trabajar el consumo de APIS web y la validación del login con base en los datos recuperados será necesaria la creación de un proyecto en ANGULAR a traves del cual se pueda consultar el contenido de una API haciendo uso de servicios; para finalmente validar que el usuario ingresado en el formulario del login se encuentre en la lista de usuarios contenidas en el JSON de consulta.

Por ello para la generación de un nuevo proyecto en Angular debemos abrir la terminal o consola, dentro de ella ubicarno en el directorio donde deseemos crear nuestro poryecto y ejecutar los siguientes comandos:

•	ng new LoginAngular_AOLC --routing --standalone=false

•	Ingresa en la carpeta del proyecto:

•	cd consumo-api-INICIALES

•	aceptar las opciones predeterminadas cuando se solicite.

![image](https://github.com/user-attachments/assets/2f133b27-f40b-476c-9051-3eac6076441c)

Comandos de Creación 

![image](https://github.com/user-attachments/assets/f551edb0-1d0b-4050-ae12-4f497330ffd5)

Proyecto Base Generado


### 3.-Generación de los componentes login para el Consumo de API
Una vez creado el proyecto base es necesario crear los componentes donde se trabajaran los elementos que contrendran nuestro sitio web para la validacion del login, para ello a continuacion se detalla la instruccion de creación del componente y el codigo de sus archivos .html, .ts, .ccs

#### Componente Login
Instrucción de creacion:
    
    ng generate module login; ng generate component login --module=login

Codigo login.html

    <div  class="container text-center mt-5" style="display: flex; align-items: center; justify-content: center;  height: 100vh;">
    <mat-card class="example-card" style="display: flex; justify-content: center;  align-items: center; border-radius: 12px; background-color: #051d25 " appearance="outlined">
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-header>    
        <mat-card-title style="color: white; font-size: 16px; ">Bienvenido a Angular</mat-card-title>
        <br><br>
        <!--<mat-card-subtitle>Dog Breed</mat-card-subtitle>-->
      </mat-card-header>
      <mat-card-content>
        <mat-form-field style="width: 400px; margin-top: 6%;" class="llenarInformacion">
          <mat-label>Correo Electrónico</mat-label>
          <input  type="email" matInput placeholder="Ingresa Email" [(ngModel)]="log_gmail">
        </mat-form-field>
        <br>
        <br>
        <mat-form-field style="width: 400px; border-radius: 28px;" class="llenarInformacion">
          <mat-label>Contraseña</mat-label>
          <input type="password" matInput placeholder="Ingresa Contraseña" [(ngModel)]="log_password">
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions style="justify-content: center; padding-bottom: 1%;">
        <button mat-flat-button style="background-color: #005e5e; color: #57ededeb; font-style: normal; width: 200px;" (click)="ingresar()"> Acceder</button>
      </mat-card-actions>
    </mat-card>
    </div>


Codigo login.ts

    import {ChangeDetectionStrategy, Component} from '@angular/core';
    import {MatButtonModule} from '@angular/material/button';
    import { Router } from '@angular/router';
    import { RouterOutlet } from '@angular/router';
    import { MatCardModule } from '@angular/material/card';
    import { MatTabsModule } from '@angular/material/tabs';
    import { MatInputModule } from '@angular/material/input';
    import { FormsModule } from '@angular/forms';
    import { MatIconModule } from '@angular/material/icon';
    import { UserService } from '../services/user.service';  // Asegúrate de que la ruta sea correcta
    
    
    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [ MatCardModule, MatButtonModule, MatButtonModule, MatTabsModule, MatInputModule, FormsModule, MatIconModule, RouterOutlet],
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css']
    })
    export class LoginComponent {
      title = 'LoginAngular_AOLC';
    
      // variables 
      log_gmail: string = '';
      log_password: string = '';
      reg_email: string = '';
      reg_password: string = '';
      reg_conf_password: string = '';
    
      hidePassword: boolean = true;
      constructor(private router: Router, private userService: UserService) {}
      verContrase() {
        this.hidePassword = !this.hidePassword;
      }
      ingresar() {
         // obtener usuarios con la api
         this.userService.getUsers().subscribe(
          (users) => {
            const validUser = users.find(
              user => user.email === this.log_gmail && user.password === this.log_password
            );
            //validar contraseña y gmail
            //si son correctos
            if (validUser) {
              alert('Inicio de sesión exitoso');
              console.log('Exito');
              this.router.navigate(['/home']);  
            } else {
              console.log('Correo o contraseña incorrectos');
              alert('Correo o contraseña incorrectos. Intente de nuevo.');
            }
            // ver usuarios y contraseñas en consola
            const userCredentials = users.map(user => ({
              email: user.email,
              password: user.password
            }));
            console.log('Correos y contraseñas:', userCredentials);
          },
          (error) => {
            console.error('Error al obtener usuarios:', error);
          }
        );
        
      }
    
      registrar() {
        console.log('Registrando usuario...');
      }
    }
    

Codigo login.css

    .example-card {
    width: 600px;
    height: 450px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border: black;
    }
  
  
    .example-header-image {
      background-image: url('https://i.pinimg.com/736x/e4/f3/83/e4f383c0344e99637fca46ec3e146403.jpg');
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18%;
      height: 0;
      padding-top: 18%; /* Mantiene el aspecto cuadrado en diferentes pantallas */
      border-radius: 50%; /* Hace que el avatar sea redondo */
      overflow: hidden; /* Oculta cualquier contenido que sobresalga */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Añade una sombra para darle profundidad */
      margin: 0 auto; /* Centra el avatar horizontalmente en el contenedor */
      margin-top: 0%;
    }

Para la validación del usuario a traves del login a los inputs de correo y constraseña se les asigna un enlace [(ngModel)] a el modelo de datos (variables) declarado en el archivo login.ts con los siguientes alias

cooreo -> [(ngModel)]="log_gmail"
password -> [(ngModel)]="log_password"

Esto para que a traves de las instrucciones 
    
    this.userService.getUsers().subscribe(
          (users) => {
            const validUser = users.find(
              user => user.email === this.log_gmail && user.password === this.log_password
            );
            //validar contraseña y gmail
            //si son correctos
            if (validUser) {
              alert('Inicio de sesión exitoso');
              console.log('Exito');
              this.router.navigate(['/home']);  
            } else {
              console.log('Correo o contraseña incorrectos');
              alert('Correo o contraseña incorrectos. Intente de nuevo.');
            }

  Se compare el valor de estas variables con los valores recuperados desde la API a traves del servicio user.service y en caso de devolverse un true se conceda el accesso a home y se mande la alerta correspondiente; todo a traves de la funcion ingresar del archivo typescript
          
#### Componente home
Instrucción de creacion:
    
    ng generate module home; ng generate component home --module=home

Codigo home.html

    <div style="background-color: #23303b;">
        <app-header></app-header>
        <div class="content">
            <app-usuarios-lista style="margin-top: 2%;"></app-usuarios-lista>
        </div>
        <app-footer></app-footer>
    </div>



Codigo home.ts

    import { Component } from '@angular/core';
    import { MatToolbarModule } from '@angular/material/toolbar';
    import { MatButtonModule } from '@angular/material/button';
    import { MatMenuModule } from '@angular/material/menu';
    import { RouterModule } from '@angular/router';
    import { HeaderComponent } from "../header/header.component";
    import { RouterOutlet, RouterLink } from '@angular/router';
    import { MenuComponent } from "../menu/menu.component";
    import { MatIconModule } from '@angular/material/icon';
    import { FooterComponent } from "../footer/footer.component";
    import { UserService } from '../services/user.service';
    import { CommonModule } from '@angular/common';
    import { UsuariosListaComponent } from "../components/usuarios-lista/usuarios-lista.component"; 
    
    @Component({
      selector: 'app-home',
      standalone: true,
      imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, HeaderComponent, FooterComponent,
        RouterLink, RouterOutlet, MenuComponent, CommonModule, UsuariosListaComponent],
      templateUrl: './home.component.html',
      styleUrl: './home.component.css'
    })
    export class HomeComponent {
      logout() {
        console.log('Logging out...');
        // Agrega la lógica de cierre de sesión aquí, como limpiar el almacenamiento local, redirigir, etc.
      }
    }


Codigo home.css

    .content{
      margin-left: 12%; 
      background-color: #212830; 
      color: mintcream;
      border-radius: 10px; 
      margin-bottom: 5%; 
      margin-right: 2%; 
      margin-top: 2%; 
      display:flex; 
      justify-content: center;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
      border: black;
      min-height: calc(100vh - 50px); /* Ajusta 50px al tamaño del footer */
      padding-bottom: 50px; /* Evita que el contenido sobrepase el footer */
    
    }

#### Componente Header
Instrucción de creacion:
    
    ng generate module header; ng generate component header --module=header

Codigo header.html

    <mat-card appearance="outlined" class="header">
        <mat-card-content>
            <app-menu></app-menu>
            <a style="padding-left: 2%;" class="social-links" href="https://github.com/AlexCL0320" target="_blank">
                <img src="/assets/git.png" alt="GitHub Logo" width="40" height="40" style="vertical-align: middle;">
            </a> AlexCL0320
        </mat-card-content>
    </mat-card>



Codigo header.ts

    import {ChangeDetectionStrategy, Component} from '@angular/core';
    import {MatCardModule} from '@angular/material/card';
    import { RouterOutlet } from '@angular/router';
    import { MenuComponent } from "../menu/menu.component";
    import { MatIconModule } from '@angular/material/icon';
    /**
     * @title Basic cards
     */
    @Component({
      selector: 'app-header',
      standalone: true,
      imports: [RouterOutlet, MatCardModule, MenuComponent,  MatIconModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: 'header.component.html',
      styleUrl: 'header.component.css'
    })
    
    export class HeaderComponent {
    
    }

Codigo header.css

    .header{
        color:azure;
        background-color: #151b23;
        border-radius: -10px;
        font-size: 12px;
        margin-top: -0.5%;
        padding-bottom: -4%;
    }
    
    .mat-card-content{
    color: azure;
    }

#### Componente Menu
Instrucción de creacion:
    
    ng generate module  menu; ng generate component menu --module=menu

Codigo menu.html
    
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>home</mat-icon> <!-- Cambiado a "home" -->
          <span>Inicio</span>
        </button>
        <button mat-menu-item>
          <mat-icon>contact_support</mat-icon> <!-- Cambiado a "mail" -->
          <span>Acerca de </span>
        </button>
        <button mat-menu-item>
          <mat-icon>notifications</mat-icon> <!-- Cambiado a "notifications" -->
          <span>Notiificaciones</span>
        </button>
        <button mat-menu-item>
          <mat-icon>fingerprint</mat-icon> <!-- Cambiado a "notifications" -->
          <span>Reconocimiento</span>
        </button>
        <button mat-menu-item>
          <mat-icon>events</mat-icon> <!-- Cambiado a "notifications" -->
          <span>Eventos</span>
        </button>
        <button mat-menu-item (click)="login()"> 
          <mat-icon>exit_to_app</mat-icon> <!-- Cambiado a "notifications" -->
          <span>Salir</span>
        </button>
      </mat-menu>


Codigo menu.ts

    import { Component } from '@angular/core';
    import { MatIconModule } from '@angular/material/icon';
    import { MatMenuModule } from '@angular/material/menu';
    import { MatButtonModule } from '@angular/material/button';
    import { Router, RouterModule } from '@angular/router';
    
    @Component({
      selector: 'app-menu',
      standalone: true,
      imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule],
      templateUrl: 'menu.component.html',
      styleUrls: ['menu.component.css']
    })
    export class MenuComponent {
      constructor(private router: Router) {}
    
      login(): void {
        this.router.navigate(['/login']);
      }
    }



Codigo menu.css

    --No se personaliza

#### Componente Footer
Instrucción de creacion:
    
    ng generate module footer; ng generate component footer --module=footer

Codigo footer.html

    <mat-card appearance="outlined" class="footer" style="background-color:#151b23; color: white;">
        <mat-card-content style="display:flex; justify-content:center;">
            <img src="public/../favicon.ico" width="20" height="20" style="vertical-align: middle" style="padding-right: 1.5%"> By Angular
        </mat-card-content>
    </mat-card>



Codigo footer.ts

    import {ChangeDetectionStrategy, Component} from '@angular/core';
    import {MatCardModule} from '@angular/material/card';
    import { RouterOutlet } from '@angular/router';
    
    /**
     * @title Basic cards
     */
    @Component({
      selector: 'app-footer',
      standalone: true,
      imports: [RouterOutlet, MatCardModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: 'footer.component.html',
      styleUrl: './footer.component.css'
    })
    export class FooterComponent {
    
    }

Codigo footer.css

    .footerr{
        color:azure;
        background-color: #151b23;
        border-radius: -20px;
        font-size: 14px;
        margin-top: -3.5%;
        position: fixed;
        width: 100%;
    
    }
    
    .mat-card-content{
    color: azure;
    background-color: #151b23;
    
    }

Con esto finalizamos la creación y distribución de los componentes de nuestro  proyecto, concluido este paso nuestro proyecto se vera de la siguiente forma:

Estructura del Proyecto Login con Componentes Incorporados

![image](https://github.com/user-attachments/assets/57f8a7a8-2b1c-4dc5-aa2e-437ce21163b9)


Vista Login

![image](https://github.com/user-attachments/assets/1eea3305-5725-488b-b8f9-6f7077961bc0)


Vista Home

![image](https://github.com/user-attachments/assets/1cd5ba88-730b-4ff1-8f8d-7b5b37513a31)

Hasta al momento aun no se recuperan dentro del proyecto los usuarios proporcionado por la API
, por lo que la tabla inicialmente se muestra vacia.

Para continuar con el desarrollo de la practica es necesaria la configuración del servicio para el consumo de la API como se detalla mas adelante

### 2.-Generación del Servicio para Consumo de API
Para iniciar el consumo de API externas es necesarios la configuración de servicios dentro de nuestro proyecto a traves de los cuales se pueda accesar a la API y recupear su contenido a traves de un JSON.

Por ello dentro del proyecto se debe generar un servicio en la carpeta services que se encargue de consumir la API Web; para ello en la terminal debemos escribir: 

• ng generate service services/user

![image](https://github.com/user-attachments/assets/fffe1c66-2ba7-4d22-8b03-96e1ee68f078)

Comandos de Generación del Servicio

### 4.- Configurar Modelo de Servicio (HttpCLienteModule)
Para permitir el acceeso del servicio dentro de los compoentes de nuestro proyecto es necesario configurar las importaciones y rutas necesarias dentro del modulo de nuestro aplicacion, debemos asegurarnos de importar la libreria HttpClienteModule y definir a ruta a nuestro servicio con la instrucción import { UserService } from './services/user.service'. Para confiugrar la paginación en nuestra proyecto será necesario contemplar la importación de la libreria NgxPaginationModule

Condigo de Configuración de Acceso al Servicio

    import { UserService } from './services/user.service';
    import { NgxPaginationModule } from 'ngx-pagination';
    
    
    imports: [
    HttpClientModule, NgxPaginationModule
    ],

Las importaciones se realizaran en los archivos usuarios-lista.component.ts, home.component.ts y login.commponent.ts

![image](https://github.com/user-attachments/assets/592f39f2-6203-41e7-b00a-66fe8f83304f)

Ejemplo de Condiguración

### 5.- Creación del Componente de Tabla de Usuarios
La presentación de los datos consumidos a traves de la API se realziara a traves de la presentación de una tabla estándar con paginación; por esto se debe crear un nuevo componente del proyecto que se encargue de manejar el contenido html y operaciones TypeScript

Para ello generaremos un nuevo componente llamado usuarios-lista a traves del siguiente comando

Comando de Generación de Componente usuarios-lista

    • ng generate component components/usuarios-lista

![image](https://github.com/user-attachments/assets/3943479b-aca6-41ce-9261-cc0798802272)


### 5.- Actualización de TypeSccript del Componente usuarios-lista para la Presentación de la API
Finalizada la creación del componente debemos dirigirnos al archivo usuarios-lista.component.ts para cconfigurar la logica de acceso al servicio del consumo de la API y el como se reccorrera el JSON de datos para su presentación en el HTML.

Para esto dentro del archivo usuarios-lista.component.ts copiamos el siguiente código:

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

![image](https://github.com/user-attachments/assets/f4bdb42d-fd3e-498c-9130-c430f33b399e)

Ejemplo Modificacion del TS

### 6.- Modificacion del Archivo de Vista (html) del Componente usuarios-lista para la Presentación de la API
Terminada la modificacion del archivo TypeScript para la recuperacion de los datos debemos proceder a la edicion del archivo usuarios-lista.component.html para inidicarle a la apliacion el como deseamos presentar nuestros datos. Para este ejemplos los datos serán presetado mediante una tabla basica donde se almacene el id, nombre, correo y rol de cada registro devuelto en el JSON.

Para ello abimos el archivo Abrir src/app/usuarios-lista/usuarios-lista.component.html y agregaamos el
siguiente código para crear una tabla donde se mostrarán los datos de los usuarios

    <mat-card style="border-radius: 0px; background-color: #212830; width: 1150px;">
      <mat-card-header style="background-color: #407160d5; border-radius: 3px;">
        <mat-card-title>Usuarios Consumo API</mat-card-title>
      </mat-card-header>
    
      <mat-card-content style="background-color: #f2f2f2; border-radius: 4px;">
        <table mat-table [dataSource]="dataSource">
    
          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef> Nombre </th>
            <td mat-cell *matCellDef="let user"> 
              {{ user.name?.firstname }} {{ user.name?.lastname }}  
            </td>
          </ng-container>
    
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Correo </th>
            <td mat-cell *matCellDef="let user"> {{ user.email }} </td>
          </ng-container>
    
          <ng-container matColumnDef="telefono">
            <th mat-header-cell *matHeaderCellDef> Teléfono </th>
            <td mat-cell *matCellDef="let user"> {{ user.phone }} </td>
          </ng-container>
    
          <ng-container matColumnDef="direccion">
            <th mat-header-cell *matHeaderCellDef> Dirección </th>
            <td mat-cell *matCellDef="let user"> 
              {{ user.address ? user.address.street : 'No disponible' }} 
            </td>
          </ng-container>
    
          <ng-container matColumnDef="contraseñas">
            <th mat-header-cell *matHeaderCellDef> Contraseña </th>
            <td mat-cell *matCellDef="let user"> {{ user.password }} </td>
          </ng-container>
    
          <ng-container matColumnDef="Imagen">
            <th mat-header-cell *matHeaderCellDef> Usuario </th>
            <td mat-cell *matCellDef="let user; let i = index">
              <!-- Alternar imagen basado en el índice -->
              <img 
                [src]="i % 2 === 0 ? '/assets/user2.png' : '/assets/image.png'" 
                alt="Imagen de usuario" 
                style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;" />
            </td>
          </ng-container>
    
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    
        <!-- Paginador -->
        <mat-paginator style="background-color: #407160d5; color: black; border-radius: 8px; font-size: 14px;" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>

Ejemplo Modificación del Archivo HTML

### 7.- Integración del Component en la Apliacion
Por ultimo cuando se termina la configuración del consumo y presentación del contenido de la API el ultimo paso será definir las ruta de acceso a los compoente dentro del arhivo src/app/app.module.ts agregando las importaciónes

como se muestra en el siguiente código:

    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { LoginModule } from './login/login.module';
    import { HomeModule } from './home/home.module';
    import { HeaderComponent } from './header/header.component';
    import { MenuComponent } from './menu/menu.component';
    import { FooterComponent } from './footer/footer.component';
    
    @NgModule({
      declarations: [],
      imports: [
        CommonModule,FormsModule, LoginModule, HomeModule, HeaderComponent, MenuComponent, FooterComponent
      ]
    })
    export class AppModule { }
    

    import { UserListComponent } from './user-list/user-list.component';

Configurada el manejo de las rutas a nuestros compoenente nos dirijimos a nuestro archivo src/app.routes.ts y dentro del el configuramos las rutas reconocidas por nuestra aplicacion, esto para mostrar como pagina principal el componente login y permitir el redireccionamiento al componente home en caso que el usuario ingresado sea valido.

Codigo de manejo de rutas:

    import { Routes } from '@angular/router';
    import { LoginComponent } from './login/login.component';
    import { HomeComponent } from './home/home.component';
    import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component'; // Asegúrate de importar correctamente
    
    export const routes: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, 
      { path: 'login', component: LoginComponent },
      {
        path: 'home',
        component: HomeComponent,
        children: [
          { path: '', component: HomeComponent }
        ]
      },
    
    ];

![image](https://github.com/user-attachments/assets/3bc3cbdd-7d8c-4745-a9a8-cfffa74e3828)
Manejo de rutas

Por ultimo para que nuestro proyecto cargue de manera correcta el formulario de login al ejecuttarse dentro del archivo app.component.html agregamos el siguiente código, para que el login sea cargado como componente principal

Instrucción de incorporacion:

    <main class="main">
      <router-outlet></router-outlet> 
    </main>

![image](https://github.com/user-attachments/assets/3f85af61-bd98-4893-9c3a-7c857db093ec)


Ejemplo de Incorporación del login a la Ejecución Base

### 8.- Ejecución de la Aplicacion y Comporbación del Consumo de la API
Con esto hemos finalizado el desarrollo de la pracica; para verificar que hemos realizado correctamente el desarrollo de la aplicacion web dentro del login ingresaremos inicialmente un usario y contraseña aleatorio para verificar que la aplicaccion arroje el mensaje de alerta de usuario invalido si tratamos de loguearnos con un usuario no incluido en la api consultada.

Por ultimo intentaremos loguearno nuevamente con el usuario john@gmail.com  con constraseña 	m38rmF$ para validar que se nos redirecciones a la ruta home si el usuario es reconocido como un usuario valido para la API consultada.

Comando de ejecución:
    
    ng serve 

![image](https://github.com/user-attachments/assets/d2765f18-db84-4e16-ad33-b77f3b7c2a5f)


![image](https://github.com/user-attachments/assets/c6948544-2e6c-456e-b33d-36fbca90af72)

Ejecución de la Apliacion con Usuario Invalido

![image](https://github.com/user-attachments/assets/5bbee50b-c7a0-46ed-9048-bf1a4da2818e)

![image](https://github.com/user-attachments/assets/4c843c82-0e05-4c9b-91df-49bd40538a73)

Ejecucución de la Aplicación con Usuario Valido

# Resultado Final del Consumo de la API
![image](https://github.com/user-attachments/assets/fea019e4-2ff5-496a-a96b-3535b348dc37)






