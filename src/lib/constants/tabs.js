import { CURRENT_USER } from '../../mock/currentUser'

export const TABS = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/home.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
  },
  {
    name: 'Search',
    active:
      'https://img.icons8.com/fluency-systems-filled/48/ffffff/search.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/search.png',
  },
  {
    name: 'Reels',
    active:
      'https://img.icons8.com/fluency-systems-filled/48/ffffff/cinema-.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/cinema-.png',
  },
  {
    name: 'Shop',
    active:
      'https://img.icons8.com/fluency-systems-filled/48/ffffff/shop-local.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/shop-local.png',
  },
  {
    name: 'Profile',
    active: CURRENT_USER.profilePicture,
    inactive: CURRENT_USER.profilePicture,
  },
]
