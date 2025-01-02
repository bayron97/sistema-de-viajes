import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {
 
  errorMessage = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
   
  }





}
