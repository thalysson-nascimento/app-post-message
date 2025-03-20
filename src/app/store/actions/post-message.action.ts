import { createAction, props } from '@ngrx/store';
import { PostMessage } from '../../shared/models/post-message.interface';

const getPostMessage = createAction('[PostMessage] Get Post Message');
const postMessageLoadedSuccessfully = createAction(
  '[PostMessage] Get Post Message Loaded Successfully',
  props<{ postMessages: PostMessage[] }>()
);
const createPostMessage = createAction(
  '[PostMessage] Create Post Message',
  props<{ postMessage: PostMessage }>()
);

export const postMessageAction = {
  getPostMessage,
  postMessageLoadedSuccessfully,
  createPostMessage,
};
