import _ from 'lodash'
import jsonPlaceholder from '../APIs/jsonPlaceholder'

export const fetchPostsAndUsers= () =>async (dispatch,getState)=>{
console.log('About to fetch posts')
await dispatch(fetchPosts())

const userIds=_.uniq(_.map(getState().posts,'userId'))
console.log(userIds)
userIds.forEach(id=>dispatch(fetchUser(id)))
userIds.map(id=>dispatch(fetchUser(id)))

_.chain(getState().posts).map('userId').uniq().forEach(id=>dispatch(fetchUser(id))).value()
}

export const fetchPosts=  ()=>{
    return async function(dispatch,getState){
    const response= await jsonPlaceholder.get('/posts');
    dispatch ({type:'FETCH_POSTS',payload:response.data})
  
}
}
export const fetchUser=(id)=>async dispatch=>{
const response= await jsonPlaceholder.get(`/users/${id}`)
dispatch({type:'FETCH_USER',payload:response.data})
}

export const selectPost=()=>{
    return{

        type:"SELECT_POST"
    }
}