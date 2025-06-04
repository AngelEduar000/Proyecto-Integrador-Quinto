import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


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
import { AddEditBrigadistasComponent } from './add-edit-brigadistas/add-edit-brigadistas.component';
import { AddUserComponent } from "./add-user/add-user.component";
import { AuthGuard } from './guard/auth.guard';
import { AuthRoleGuard } from './guard/auth-role.guard';
import { AddEspecieComponent } from "./add-especie/add-especie.component";
import { CookieManagerComponent } from "./cookie-manager/cookie-manager.component";
import { AnalisisLaboratorioComponent } from "./analisis-laboratorio/analisis-laboratorio.component";
import { BrigadasComponent } from "./brigada/brigada.component";



export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'especies', component: EspeciesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'cookies', component: CookieManagerComponent },
  { path: 'mostrar-brigada', component: BrigadasComponent, canActivate: [AuthRoleGuard], data: { roles: ['cientifico', 'investigador', 'ideam', 'administrador'] } },

  // Solo accesible por roles específicos
  { path: 'investigacion', component: InvestigacionComponent, canActivate: [AuthRoleGuard], data: { roles: ['cientifico', 'investigador'] } },
  { path: 'laboratorio', component: LaboratorioComponent, canActivate: [AuthRoleGuard], data: { roles: ['cientifico'] } },
  { path: 'add-especie', component: AddEspecieComponent, canActivate: [AuthRoleGuard], data: { roles: ['cientifico'] } },
    { path: 'analisis_laboratorio', component: AnalisisLaboratorioComponent, canActivate: [AuthRoleGuard], data: { roles: ['cientifico'] } },
  { path: 'ideam', component: IdeamComponent, canActivate: [AuthRoleGuard], data: { roles: ['ideam'] } },

  { path: 'add', component: AgregarConglomeradoComponent, canActivate: [AuthRoleGuard], data: { roles: ['ideam'] } },
  { path: 'conglomerados/edit/:id', component: AgregarConglomeradoComponent, canActivate: [AuthRoleGuard], data: { roles: ['ideam'] } },
  { path: 'add2', component: AddEditBrigadistasComponent, canActivate: [AuthRoleGuard], data: { roles: ['ideam'] } },
  { path: 'brigadistas/edit/:id', component: AddEditBrigadistasComponent, canActivate: [AuthRoleGuard], data: { roles: ['ideam'] } },

  { path: 'add-user', component: AddUserComponent, canActivate: [AuthRoleGuard], data: { roles: ['administrador'] } },

];



@NgModule({
    imports: [RouterModule.forRoot(routes), BrowserModule ],
    exports: [RouterModule]
    })
export class AppRoutingModule { }

