import {createSelector} from "reselect";

const contacts = state => state.contact.contacts;
const contacts_ids = state => state.contact.contacts_ids;
const total = state => state.contact.total;

export const evenSelector = state => state.contact.filter.even;

export const isLoadingSelector = state => state.contact.isLoading;

export const getContactData = createSelector(
  [contacts, contacts_ids, evenSelector],
  (contacts, contacts_ids, even) => {
    let ids = [...contacts_ids]
    if (even) {
      ids = ids.filter(id => id % 2 === 0)
    }
    console.log({ ids })
    return ids.map(id => contacts[id])
  }
)

export const getPages = createSelector(
  [total],
  (total) => {
    return Math.ceil(total / 20)
  }
)
