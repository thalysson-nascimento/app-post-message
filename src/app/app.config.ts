import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { appReducers } from './state/app.reducers';
import {
  createPostMessageEffect,
  deletePostMessageEffect,
  searchPostMessageEffect,
  showSuccessSnackbarEffect,
} from './store/effects/post-message.effect';

const firebaseConfig = {
  apiKey: 'AIzaSyC4acEcFWoon4T8qa6LuEdJAs5FLkY-94I',
  authDomain: 'deploy-app-post-message.firebaseapp.com',
  projectId: 'deploy-app-post-message',
  storageBucket: 'deploy-app-post-message.firebasestorage.app',
  messagingSenderId: '968930860706',
  appId: '1:968930860706:web:270ebd7cb70a0d12e4c1fb',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStore(appReducers),
    provideEffects({
      searchPostMessageEffect,
      createPostMessageEffect,
      showSuccessSnackbarEffect,
      deletePostMessageEffect,
    }),
  ],
};
