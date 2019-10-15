export function fetchUser(userId) {
  
  return { type:"USER_FETCH_REQUESTED", payload: { userId:userId } }
}