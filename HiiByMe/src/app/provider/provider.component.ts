import { Component, OnInit } from '@angular/core';
import {BlogService} from "../services/blog.service";

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(private service:BlogService) { }

  ngOnInit() {
  }


 

}
