import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
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
        postMessageFirebaseService.getPostMessage().pipe(
          map((postMessages) =>
            postMessageAction.getPostMessageLoadedSuccessfully({ postMessages })
          ),
          catchError((error) =>
            of(
              postMessageAction.getPostMessageLoadedWithError({
                error: error,
              })
            )
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
          postMessageAction.getPostMessageLoadedSuccessfully({
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

export const deletePostMessageEffect = createEffect(
  (
    action$ = inject(Actions),
    postMessageFirebaseService = inject(PostMessageFirebaseService),
    snackBar = inject(MatSnackBar)
  ) => {
    return action$.pipe(
      ofType(postMessageAction.deletePostMessage),
      switchMap(({ idPostMessage }) =>
        from(postMessageFirebaseService.deletePostMessage(idPostMessage)).pipe(
          switchMap(() =>
            postMessageFirebaseService.getPostMessage().pipe(
              map((postMessages) =>
                postMessageAction.getPostMessageLoadedSuccessfully({
                  postMessages,
                })
              ),
              catchError((error) =>
                of(
                  postMessageAction.getPostMessageLoadedWithError({
                    error: error,
                  })
                )
              )
            )
          ),
          catchError((error) => {
            snackBar.open('Error deleting message', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });

            return of(
              postMessageAction.deletePostMessageFailure({
                error: error.message,
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
);
