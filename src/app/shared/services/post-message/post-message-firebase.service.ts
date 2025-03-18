import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PostMessage } from '../../models/post-message.interface';

@Injectable({
  providedIn: 'root',
})
export class PostMessageFirebaseService {
  private postMessageCollection;

  constructor(private firestore: Firestore) {
    this.postMessageCollection = collection(this.firestore, 'post-message'); // ✅ Correto
  }

  getPostMessage(): Observable<PostMessage[]> {
    return collectionData(this.postMessageCollection, {
      idField: 'id',
    }) as Observable<PostMessage[]>;
  }
}
