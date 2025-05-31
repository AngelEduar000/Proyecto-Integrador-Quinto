import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { InicioComponent } from './inicio/inicio.component';
import { MapaComponent } from './mapa/mapa.component';
import { LoginComponent } from './login/login.component';
import { ReportesComponent } from './reportes/reportes.component';
import { EspeciesComponent } from './especies/especies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InvestigacionComponent } from './investigacion/investigacion.component';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';
import { IdeamComponent } from './ideam/ideam.component';
import { AgregarConglomeradoComponent } from './add-edit-conglomerados/add-edit-conglomerados.component';
import {AddEditBrigadistasComponent} from './add-edit-brigadistas/add-edit-brigadistas.component';
import { AddUserComponent } from "./add-user/add-user.component";
import { AuthGuard } from './guard/auth.guard';





export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'especies', component: EspeciesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'investigacion', component: InvestigacionComponent, canActivate: [AuthGuard] },
  { path: 'laboratorio', component: LaboratorioComponent, canActivate: [AuthGuard] },
  { path: 'ideam', component: IdeamComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AgregarConglomeradoComponent, canActivate: [AuthGuard] },
  { path: 'conglomerados/edit/:id', component: AgregarConglomeradoComponent, canActivate: [AuthGuard] },
  { path: 'add2', component: AddEditBrigadistasComponent, canActivate: [AuthGuard] }, // Para agregar
  { path: 'brigadistas/edit/:id', component: AddEditBrigadistasComponent, canActivate: [AuthGuard] }, // Para editar
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
export class AppRoutingModule { }

