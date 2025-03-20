import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { PostMessageState } from '../reducers/post-message.reducer';

export const postMessageSelector = (appState: AppState) =>
  appState.postMessages.postMessages;

export const selectPostMessageState =
  createFeatureSelector<PostMessageState>('postMessages');

export const selectLoading = createSelector(
  selectPostMessageState,
  (state) => state.status === 'loading'
);
