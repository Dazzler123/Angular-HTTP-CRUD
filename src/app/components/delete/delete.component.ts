import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  list: Array<any> = [];

  constructor(private postService:PostService) {
  }

  ngOnInit(): void {
    this.postService.findAll().subscribe(response => {
      console.log(response);
      this.list = response;
    })
  }

  delete(id:any) {
    if (confirm('Are you sure ? ' + id)) {
      this.postService.delete(id).
      subscribe(response => {
        alert("Row deleted successfully!");
      })
    }
  }
}
