import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private localService: LocalService,
  ) {}

  ngOnInit(): void {
    // Удалить потом
    console.log(this.localService.getData('email'), this.localService.getData('uid'), this.localService.getData('token'));
  }
}
