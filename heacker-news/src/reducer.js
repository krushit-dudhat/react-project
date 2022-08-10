import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
    }
  }

  if (action.type === SET_STORIES) {
    const { hits, page, nbPages } = action.payload.data;
    return {
      ...state,
      stories: hits,
      page: {
        count: page,
        totalPage: nbPages,
      }
    }
  }

  if (action.type === REMOVE_STORY) {
    return {
      ...state,
      stories: state.stories.filter(story => story.objectID !== action.payload),
    }
  }

  if (action.type === HANDLE_PAGE) {
    let page = state.page.count;
    if (action === 'next') {
      // api counts pages form 0 index, so 0 to 49 is 50.
      if (page < state.page.totalPage - 1) {
        page = page + 1;
      }
    } else if (action === 'prev') {
      if (page > 0) {
        page = page - 1;
      }
    }

    return {
      ...state,
      page: {
        count: page,
        ...state.page,
      },
    };
  }

  if (action.type === HANDLE_SEARCH) {
    return {
      ...state,
      stories: [],
      query: action.payload,
      page: {
        count: 0,
        totalPage: 0,
      }
    }
  }
  return state;
}

export default reducer
