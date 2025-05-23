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



export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'especies', component: EspeciesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'investigacion', component: InvestigacionComponent },
  { path: 'laboratorio', component: LaboratorioComponent },
  { path: 'ideam', component: IdeamComponent },
  { path: 'add', component: AgregarConglomeradoComponent,},
  { path: 'add2', component: AddEditBrigadistasComponent,},
  { path: 'add-user', component: AddUserComponent },
  //{path: 'brigadistas/edit/:id', component: AddEditBrigadistasComponent, data: { renderMode: 'no-prerender' } }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
export class AppRoutingModule { }

