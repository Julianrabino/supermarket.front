import { Component, OnInit } from '@angular/core';
import { BonitaCase } from 'src/app/bonita/case/bonita-case.model';
import { ErrorService } from 'src/app/error/error.service';
import { ConfigService } from 'src/app/config/config.service';
import { BonitaCaseService } from 'src/app/bonita/case/bonita-case.service';
import { animacionVerticalExpand } from 'src/app/animations/animacion-vertical-expand';

@Component({
  selector: 'app-monitor-archived-cases',
  templateUrl: './monitor-archived-cases.component.html',
  styleUrls: ['./monitor-archived-cases.component.css'],
  animations: [ animacionVerticalExpand ]
})
export class MonitorArchivedCasesComponent implements OnInit {

  casos: BonitaCase[];
  cantidadCasos: number;
  paginaActual: number;
  itemsPorPagina: number;

  constructor(
    private errorService: ErrorService,
    private configService: ConfigService,
    private bonitaCaseService: BonitaCaseService
  ) { }

  ngOnInit() {
    this.itemsPorPagina = this.configService.Config.bonita.cantidadElementosPagina;
    this.bonitaCaseService.getCantidadArchivedCases().then(
      cant => {
        this.cantidadCasos = cant;
        if (this.cantidadCasos > 0) {
          this.paginaActual = 0;
          this.bonitaCaseService.getArchivedCases(this.paginaActual).then(
            res => {
              this.casos = res;
            }
          );
        } else {
          this.casos = [];
        }
      }
    )
    .catch(error => {
      this.errorService.handle(error);
    });
  }

  public pageChanged(event) {
    this.paginaActual = event.page - 1;
    this.bonitaCaseService.getArchivedCases(this.paginaActual).then(
      res => {
        this.casos = res;
      })
    .catch(error => {
        this.errorService.handle(error);
      });
  }

}
