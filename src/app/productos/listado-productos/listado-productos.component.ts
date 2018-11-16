import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { SessionService } from 'src/app/storage/session.service';
import { BonitaCaseService } from 'src/app/bonita/bonita-case.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  productos: Producto[];
  caseId: number;

  constructor(
    private sessionService: SessionService,
    private bonitaCaseService: BonitaCaseService
    ) { }

  ngOnInit() {
    if (!this.sessionService.currentCase) {
      this.bonitaCaseService.start().then(caseId => {
        this.caseId = caseId;
      });
    }
  }
}
