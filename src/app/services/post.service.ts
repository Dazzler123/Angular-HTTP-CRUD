import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import Post from "../dto/Post";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseURL = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient, private fireStore: AngularFirestore) {
  }

  findAll(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'posts');
  }

  find(id: any): Observable<any> {
    return this.http.get<any>(this.baseURL + 'posts?id=' + id);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'posts/' + id);
  }

  // create(id: any, userId: any, title: any, body: any): Observable<any> {
  //   return this.http.post<any>(this.baseURL + 'posts', {
  //     id,
  //     userId,
  //     title,
  //     body
  //   });
  // }

  createDataFireStore(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore.collection('post-data')
        .add(post)
        .then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        })
    });
  }

  update(id: any, userId: any, title: any, body: any): Observable<any> {
    return this.http.put<any>(this.baseURL + 'posts/' + id, {
      id,
      userId,
      title,
      body
    });
  }

}
