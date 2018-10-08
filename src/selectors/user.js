import { createSelector } from 'reselect'

const selectUserDomain = (state) => state.user;

export const isUserLoggedIn = () => createSelector(selectUserDomain, subdomain =>  !!subdomain.user );
export const selectLoggedInUser = () => createSelector(selectUserDomain, subdomain => subdomain.user );