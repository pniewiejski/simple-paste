export const pasteStorageLocal = {
  postPaste: ({pasteContent, pastePersistance}) => {
    const key = 'dummy'
    window.localStorage.setItem(
      key,
      JSON.stringify({pasteContent, pastePersistance}),
    )
    return Promise.resolve()
  },
  getPasteById: (id) => {
    const key = 'dummy'
    const pasteItem = JSON.parse(window.localStorage.getItem(key))
    return Promise.resolve(pasteItem)
  },
}

export const pasteStorage = ({getPasteById, postPaste}) => ({
  getPasteById: (id) => getPasteById(id),
  postPaste: ({pasteContent, pastePersistance}) =>
    postPaste({pasteContent, pastePersistance}),
})
