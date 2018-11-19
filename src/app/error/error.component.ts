import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  mensaje: string;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.mensaje = this.sessionService.currentError;
  }

}
