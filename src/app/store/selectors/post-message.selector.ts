import { AppState } from '../../state/app.state';

export const postMessageSelector = (appState: AppState) =>
  appState.postMessages.postMessages;
