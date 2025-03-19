import { ActionReducerMap } from '@ngrx/store';
import { postMessageReducer } from '../store/reducers/post-message.reducer';
import { AppState } from './app.state';

export const appReducers: ActionReducerMap<AppState> = {
  postMessages: postMessageReducer,
};
