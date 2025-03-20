import { createReducer, on } from '@ngrx/store';
import { PostMessage } from '../../shared/models/post-message.interface';
import { postMessageAction } from '../actions/post-message.action';

enum PostMessageStatus {
  LOADING = 'loading',
  PENDING = 'pending',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface PostMessageState {
  postMessages: PostMessage[];
  error: string | null;
  status: PostMessageStatus;
}

const initialState: PostMessageState = {
  postMessages: [],
  error: null,
  status: PostMessageStatus.PENDING,
};

export const postMessageReducer = createReducer(
  initialState,
  on(postMessageAction.getPostMessage, (state) => {
    return {
      ...state,
      status: PostMessageStatus.LOADING,
    };
  }),
  on(
    postMessageAction.getPostMessageLoadedSuccessfully,
    (state, { postMessages }) => {
      return {
        ...state,
        postMessages,
        status: PostMessageStatus.SUCCESS,
      };
    }
  ),
  on(postMessageAction.getPostMessageLoadedWithError, (state, { error }) => {
    return {
      ...state,
      error: error || null,
      status: PostMessageStatus.ERROR,
    };
  }),
  on(postMessageAction.createPostMessage, (currentState, { postMessage }) => {
    return {
      ...currentState,
      postMessages: [...currentState.postMessages, postMessage],
      status: PostMessageStatus.LOADING,
    };
  }),
  on(postMessageAction.createPostMessage, (currentState, { postMessage }) => {
    return {
      ...currentState,
      postMessages: [...currentState.postMessages, postMessage],
      status: PostMessageStatus.SUCCESS,
    };
  })
);
