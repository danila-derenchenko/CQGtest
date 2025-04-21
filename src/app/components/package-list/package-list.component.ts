import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PackageCardComponent } from '../package-card/package-card.component';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageCardComponent],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent implements OnInit {
  @Output() packages: any;

  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:3000/packages')
      .subscribe(data => {
        this.packages = data;
        this.loading = false;
        console.log(data)
      });
  }
}