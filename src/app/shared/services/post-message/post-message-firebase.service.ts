import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
} from '@angular/fire/firestore';
import { deleteDoc, orderBy, query, updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { PostMessage } from '../../models/post-message.interface';

@Injectable({
  providedIn: 'root',
})
export class PostMessageFirebaseService {
  private collectionName = 'post-message';
  private postMessageCollection;

  constructor(private firestore: Firestore) {
    this.postMessageCollection = collection(
      this.firestore,
      this.collectionName
    );
  }

  getPostMessage(): Observable<PostMessage[]> {
    const postMessageQuery = query(
      this.postMessageCollection,
      orderBy('createdAt', 'desc')
    );

    return collectionData(postMessageQuery, {
      idField: 'id',
    }) as Observable<PostMessage[]>;
  }

  async createPostMessage(postMessage: PostMessage): Promise<void> {
    return addDoc(this.postMessageCollection, postMessage).then(() => {});
  }

  async updatePostMessage(id: string, updateData: Partial<PostMessage>) {
    const postMessageDocRef = doc(
      this.firestore,
      `${this.collectionName}/${id}`
    );
    return await updateDoc(postMessageDocRef, updateData);
  }

  async deletePostMessage(id: string) {
    const postMessageDocRef = doc(
      this.firestore,
      `${this.collectionName}/${id}`
    );
    return await deleteDoc(postMessageDocRef);
  }
}
