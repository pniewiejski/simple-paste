import {Paste} from './api'

export const pasteStorageMock = {
  postPaste: async ({pasteContent, pastePersistance}) => {
    const key = 'dummy'
    window.localStorage.setItem(
      key,
      JSON.stringify({pasteContent, pastePersistance}),
    )
    return Promise.resolve()
  },
  getPasteById: async (resourceId) => {
    const key = 'dummy'
    const localStorageItem = window.localStorage.getItem(key)
    let pasteItem = {
      pasteContent: 'This is just a mocked paste content',
      pastePersistance: 15,
    }
    if (!localStorageItem)
      pasteItem = JSON.parse(window.localStorage.getItem(key))
    return Promise.resolve(pasteItem)
  },
}

export const pasteStorageHttp = {
  getPasteById: async resourceId => Paste.getById(resourceId),
  postPaste: async ({pasteContent, pastePersistance}) => Paste.create({pasteContent, pastePersistance})
}

export const pasteStorage = ({getPasteById, postPaste}) => ({
  getPasteById: async (resourceId) => getPasteById(resourceId),
  postPaste: async ({pasteContent, pastePersistance}) =>
    postPaste({pasteContent, pastePersistance}),
})
