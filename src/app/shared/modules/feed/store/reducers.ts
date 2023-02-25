import {FeedStateInterface} from '../types/feed-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {routerNavigationAction} from '@ngrx/router-store';
import {getFeedAction, getFeedSuccessAction, getFeedFailureAction} from './actions/get-feed.action';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFeedSuccessAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })
  ),
  on(
    getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): FeedStateInterface => initialState)
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
