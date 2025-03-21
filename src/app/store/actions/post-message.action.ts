import { createAction, props } from '@ngrx/store';
import { PostMessage } from '../../shared/models/post-message.interface';

const getPostMessage = createAction('[PostMessage] Get Post Message');
const getPostMessageLoadedSuccessfully = createAction(
  '[PostMessage] Get Post Message Loaded Successfully',
  props<{ postMessages: PostMessage[] }>()
);
export const getPostMessageLoadedWithError = createAction(
  '[PostMessage] Load PostMessage Failed',
  props<{ error: string }>()
);

const createPostMessage = createAction(
  '[PostMessage] Create Post Message',
  props<{ postMessage: PostMessage }>()
);

const deletePostMessage = createAction(
  '[PostMessage] Delete Post Message',
  props<{ idPostMessage: string }>()
);

export const deletePostMessageFailure = createAction(
  '[PostMessage] Delete PostMessage Failed',
  props<{ error: string }>()
);

export const postMessageAction = {
  getPostMessage,
  getPostMessageLoadedSuccessfully: getPostMessageLoadedSuccessfully,
  getPostMessageLoadedWithError: getPostMessageLoadedWithError,
  createPostMessage,
  deletePostMessage,
  deletePostMessageFailure,
};
