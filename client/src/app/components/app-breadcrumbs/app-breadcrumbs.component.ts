import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item"
        *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last"
        [ngClass]="{active: last}">
      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
    </li>
    <span *ngIf="last" class="fa fa-question-circle" style="font-size: 24px; padding-left: 20px;" (click)="open(content)"></span>
  </ng-template>
  <ng-template #content let-c="close" let-d="dismiss">
    <div class="modal-header">
      <h4 class="modal-title">Instrucciones de uso</h4>
      <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h5>Selección de estación</h5>
      <ol>
        <li>Seleccionar la ciudad a consultar.</li>
        <li>Seleccionar la estación a consultar.</li>
        <li>Confirmar selección haciendo click en <strong>Guardar Estación</strong>.</li>
      </ol>
      <h5>Selección de indicadores</h5>
      <ol>
        <li>Ir al indicador a visualizar.</li>
        <li>Seleccionar el rango de fechas del indicador seleccionado.<br><strong>Obs: Presionar el día inicial y luego el día final</strong>.</li>
        <li>Activar el indicador.</li>
        <li>Repetir el proceso según sea necesario dentro del indicador.</li>
        <li>Finalizar la selección haciendo click en <strong>Guardar Cambios</strong>.</li>
      </ol>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="c('Close click')">Cerrar</button>
    </div>
  </ng-template>`
})
export class AppBreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.route.root,
      url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        // tslint:disable-next-line:no-shadowed-variable
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            this.breadcrumbs.push({
              label: route.snapshot.data,
              url:   url
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }

  open(content) {
    this.modalService.open(content)
  }
}
