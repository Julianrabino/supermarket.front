import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-monitor-header',
  templateUrl: './monitor-header.component.html',
  styleUrls: ['./monitor-header.component.css']
})
export class MonitorHeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  public logOut() {
    this.loginService.logOut();
  }
}
