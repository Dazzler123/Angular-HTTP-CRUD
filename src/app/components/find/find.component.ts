import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {

  searchId = '';
  list: Array<any> = [];

  constructor(private postService:PostService) {
  }

  ngOnInit(): void {
  }

  loadData() {
    this.postService.find(this.searchId).subscribe(response => {
      console.log(response);
      this.list = response;
    })
  }


}
