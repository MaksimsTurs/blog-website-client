import coockie from "./lib/coockie/coockie"

export const URL_SEARCH_PARAMS = {
  'IS-LOGIN-MODAL-OPEN': 'is-login-modal-open',
  'IS-REGISTRATE-MODAL-OPEN': 'is-registrate-modal-open',
  'IS-EDIT-USER-MODAL-OPEN': 'is-edit-user-modal-open',
  'IS-FILTER-MODAL-OPEN': 'is-filter-modal-open',
  'IS-ADD-GALERY-MODAL-OPEN': 'is-add-galery-modal-open',
  'IS-UPLOAD-MODAL-OPEN': 'is-upload-modal-open',
//--------------------------------------------------------------------
  'IS-SIDE-MENU-OPEN': 'is-side-menu-open',
//--------------------------------------------------------------------
  'STATISTIC-TO-CHECK': 'statistic-to-check',
  'CURRENT-SLIDE': 'current-slide',
  'GALERY-ID': 'galery-id',
  'DATABASE-ID': 'database-id',
  'STATISTIC-PREVIEW-POST-ID': 'statistic-preview-post-id',
  'LIST-PAGE': 'list-page',
  'PAGE': 'page'
}

export const AUTHORIZATION_OBJECT = { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` }