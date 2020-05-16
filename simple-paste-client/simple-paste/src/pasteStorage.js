import {Paste} from './api'

export const pasteStorageHttp = {
  getPasteById: async (resourceId) => Paste.getById(resourceId),
  postPaste: async ({pasteContent, pastePersistance}) =>
    Paste.create({pasteContent, pastePersistance}),
}

export const pasteStorage = ({getPasteById, postPaste}) => ({
  getPasteById: async (resourceId) => getPasteById(resourceId),
  postPaste: async ({pasteContent, pastePersistance}) =>
    postPaste({pasteContent, pastePersistance}),
})
