
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/TokenServices/token.service';

@Component({
  selector: 'app-number-sets',
  templateUrl: './number-sets.component.html',
  styleUrl: './number-sets.component.scss'
})
export class NumberSetsComponent {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.info('NumberSets Component initialized');
    
  }

}
