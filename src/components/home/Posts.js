import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import React from 'react'
import { POST, getIconUri } from '../../lib/constants/icons'
import {
  getAuth,
  doc,
  updateDoc,
  getFirestore,
  arrayUnion,
  arrayRemove,
} from '../../lib/fire'

const Post = ({ post }) => {
  const auth = getAuth()
  const db = getFirestore()

  const handleLike = async (post) => {
    const currentLikeStatus = !post.likes.includes(auth.currentUser.uid)

    try {
      await updateDoc(doc(db, `users/${post.uid}/posts`, post.id), {
        likes: currentLikeStatus
          ? arrayUnion(auth.currentUser.uid)
          : arrayRemove(auth.currentUser.uid),
      })
      console.log('[Post.handleLike] - Document successfully updated!')
    } catch (error) {
      console.log('[Post.handleLike] - Error updating document: ', error)
    }
  }

  return (
    <View style={styles.post}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostImage post={post} />
        <PostFooter post={post} handleLike={handleLike} auth={auth} />
        <PostLikes post={post} />
        <PostCaption post={post} />
        <PostCommentSection post={post} />
        <PostComments post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
  <View style={styles.postHeader}>
    <View style={styles.headerContent}>
      <Image source={{ uri: post.profilePicture }} style={styles.story} />
      <Text style={styles.text}>{post.username}</Text>
    </View>
    <Text style={[styles.text, styles.boldText]}>...</Text>
  </View>
)

const PostImage = ({ post }) => {
  const { image } = post
  const { uri, scaleType, customDimensions } = image

  return (
    <View style={styles.postImageContainer}>
      <Image
        source={{ uri: uri }}
        style={[styles.postImage(scaleType, customDimensions)]}
      />
    </View>
  )
}

const PostFooter = ({ post, handleLike, auth }) => {
  return (
    <View style={styles.postFooterContainer}>
      <View style={styles.leftFooterIconContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.likes.includes(auth.currentUser.uid)
                ? getIconUri('Like', POST, (toggled = true))
                : getIconUri('Like', POST),
            }}
          />
        </TouchableOpacity>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={getIconUri('Comment', POST)}
        />
        <Icon imgStyle={styles.footerIcon} imgUrl={getIconUri('Share', POST)} />
      </View>

      <View>
        <Icon imgStyle={styles.footerIcon} imgUrl={getIconUri('Save', POST)} />
      </View>
    </View>
  )
}

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
)

const PostLikes = ({ post }) => (
  <View style={styles.postLikesContainer}>
    <Text style={styles.likesText}>
      {post.likes.length.toLocaleString('en')} likes
    </Text>
  </View>
)

const PostCaption = ({ post }) => (
  <View style={styles.postCaptionContainer}>
    <Text style={styles.captionText}>
      <Text style={styles.captionUsername}>{post.username}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
)

const PostCommentSection = ({ post }) => (
  <View style={styles.commentSectionContainer}>
    {!!post.comments.length && (
      <Text style={styles.commentSectionText}>
        View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const PostComments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={styles.commentContainer}>
        <Text style={styles.commentText}>
          <Text style={styles.commentUsername}>{comment.user}</Text>{' '}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  post: {
    marginBottom: 30,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '700',
  },
  boldText: {
    fontWeight: '900',
  },
  postImageContainer: {
    width: '100%',
    height: 450,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImage: (scaleType, customDimensions) => {
    // scaleType:
    //    1) contain: resized to be completely visible, while preserving its aspect ratio
    //    2) cover: resized such that it will scale to the full size of the view
    //    3) custom: resized to the custom dimensions
    if (scaleType === 'custom') {
      const aspectRatio = customDimensions
        ? customDimensions.width / customDimensions.height
        : 1
      return {
        resizeMode: 'contain',
        aspectRatio,
        ...customDimensions,
      }
    } else {
      return {
        resizeMode: scaleType === 'contain' ? 'contain' : 'cover',
        width: '100%',
        height: '100%',
      }
    }
  },
  postFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  leftFooterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  postLikesContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 2,
  },
  likesText: {
    color: 'white',
    fontWeight: '600',
  },
  postCaptionContainer: {
    marginTop: 5,
  },
  captionText: {
    color: 'white',
  },
  captionUsername: {
    fontWeight: '600',
  },
  commentSectionContainer: {
    marginTop: 5,
  },
  commentSectionText: {
    color: 'gray',
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  commentText: {
    color: 'white',
  },
  commentUsername: {
    fontWeight: '600',
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: '#ff8501',
    marginLeft: 6,
    resizeMode: 'contain',
  },
})

export default Post
