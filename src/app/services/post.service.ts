import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import Post from "../dto/Post";

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

  findAllDataFireStore() {
    return this.fireStore.collection('post-data').snapshotChanges();
  }


  find(id: any): Observable<any> {
    return this.http.get<any>(this.baseURL + 'posts?id=' + id);
  }

  findDataFireStore(id: any) {
    return this.fireStore.collection('post-data').doc(id).valueChanges();
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.baseURL + 'posts/' + id);
  }

  deleteDataFireStore(id: any) {
    return this.fireStore.collection('post-data').doc(id).delete();
  }

  create(id: any, userId: any, title: any, body: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'posts', {
      id,
      userId,
      title,
      body
    });
  }

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

  updateDataFireStore(post:Post) {
    return this.fireStore.collection('post-data')
      .doc(post.id.toString())
      .update({
        userId:post.userId,
        title:post.title,
        body:post.body,
      });
  }

}
