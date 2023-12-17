export const HEADER = [
  {
    name: 'NewPost',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png',
  },
  {
    name: 'Likes',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
  },
  {
    name: 'Messenger',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png',
  },
]

export const POST = [
  {
    name: 'Like',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
    toggledUri: 'https://img.icons8.com/ios-filled/60/E74C3C/like.png',
  },
  {
    name: 'Comment',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/speech-bubble--v1.png',
  },
  {
    name: 'Share',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane.png',
  },
  {
    name: 'Save',
    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon--v1.png',
  },
]

export function getIconUri(name, iconsArray, toggled = false) {
  let uri = ''
  const icon = iconsArray.find((item) => item.name === name)

  if (icon && toggled === true) {
    uri = icon.toggledUri
  } else {
    uri = icon.uri
  }

  return uri
}
