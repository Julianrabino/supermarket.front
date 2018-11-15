import { Component, OnInit } from '@angular/core';
import { BonitaAuthenticationService } from 'src/app/bonita/bonita-authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  tokenResp: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // public ObtenerProductos(): Promise<string> {
  //   const promise = new Promise<string>((resolve, reject) => {
  //     this.http.get('http://localhost:49257/api/product').toPromise().then(
  //       resp => { resolve(JSON.stringify(resp)); },
  //       err => { reject(err); }
  //     );
  //   });
  //   return promise;
  // }

}
