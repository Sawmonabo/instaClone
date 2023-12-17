import { USERS } from './users'

export const POSTS = [
  {
    image: {
      uri: 'https://lh3.googleusercontent.com/p/AF1QipN-SceG5cWCP9ualm50DP9ZYXTQeljhqDRUcID9=w1080-h608-p-no-v0',
      scaleType: 'contain',
      customDimensions: null,
    },
    user: USERS[0].user,
    likes: 7870,
    caption:
      'Bring up to 5 friends tonight and get free cover and a free bottle of champagne!',
    profilePicture: USERS[0].image,
    comments: [
      {
        user: 'thezaman',
        comment: 'This is amazing man!',
      },
      {
        user: 'codedbalam',
        comment: 'I wake up, I code, I go back to sleep!',
      },
    ],
  },
  {
    image: {
      uri: 'https://scontent.cdninstagram.com/v/t51.2885-15/334441086_578195834257686_3470279146831759187_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=aaMqtJCwZ5cAX9JMzuB&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAIrvc1pNLH2CAY6IlQcpKfoKqHDXCcBcsLJ3_brTOA3Q&oe=6567D4A7&_nc_sid=10d13b',
      scaleType: 'custom',
      customDimensions: { width: 400, height: 390 },
    },
    user: USERS[1].user,
    likes: 4721,
    caption:
      'Tonight only, bring up to 3 friends and get a free drink on us with entry to our speakeasy! #speakeasy #bartr #bartrapp #bartrapp.com',
    profilePicture: USERS[1].image,
    comments: [
      {
        user: 'jaypatel',
        comment: "Damn boi, i'll pull up with the homies!",
      },
    ],
  },
  {
    image: {
      uri: 'https://images.pexels.com/photos/8029710/pexels-photo-8029710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      scaleType: 'cover',
      customDimensions: null,
    },
    user: USERS[2].user,
    likes: 6220,
    caption: 'Work hard, study hard.',
    profilePicture: USERS[2].image,
    comments: [
      {
        user: 'blessed',
        comment: 'You totally getting that job girl!',
      },
      {
        user: 'mattrix',
        comment: 'keep it up girl, you are definitly close!',
      },
    ],
  },
]
