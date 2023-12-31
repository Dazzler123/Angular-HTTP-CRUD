import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  list: Array<any> = [];

  constructor(private postService: PostService) {
  }

  form = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.maxLength(5)]),  //'01' is the initial value
    userId: new FormControl('', Validators.required),                                                 // Validators.maxLength() <--- validate input character count like so..
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  createData() {
    this.postService.create(
      this.form.get('id')?.value,
      this.form.get('userId')?.value,
      this.form.get('title')?.value,
      this.form.get('body')?.value
    ).subscribe(response => {
      if (response) {
        alert('Created!');
      }
    })
  }

}
