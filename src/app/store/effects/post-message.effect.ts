import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { PostMessageFirebaseService } from '../../shared/services/post-message/post-message-firebase.service';
import { postMessageAction } from '../actions/post-message.action';

export const searchPostMessageEffect = createEffect(
  (
    action$ = inject(Actions),
    postMessageFirebaseService = inject(PostMessageFirebaseService)
  ) => {
    return action$.pipe(
      ofType(postMessageAction.getPostMessage),
      tap(() => console.log('searchPostMessageEffect')),
      switchMap(() =>
        postMessageFirebaseService
          .getPostMessage()
          .pipe(
            map((postMessages) =>
              postMessageAction.postMessageLoadedSuccessfully({ postMessages })
            )
          )
      )
    );
  },
  { functional: true }
);

export const createPostMessageEffect = createEffect(
  (
    action$ = inject(Actions),
    postMessageFirebaseService = inject(PostMessageFirebaseService)
  ) => {
    return action$.pipe(
      ofType(postMessageAction.createPostMessage),
      switchMap(({ postMessage }) =>
        postMessageFirebaseService.createPostMessage(postMessage).then(() =>
          postMessageAction.postMessageLoadedSuccessfully({
            postMessages: [postMessage],
          })
        )
      )
    );
  },
  { functional: true }
);

export const showSuccessSnackbarEffect = createEffect(
  (action$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return action$.pipe(
      ofType(postMessageAction.createPostMessage),
      tap(() => {
        snackBar.open('message saved successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    );
  },
  { functional: true, dispatch: false }
);
