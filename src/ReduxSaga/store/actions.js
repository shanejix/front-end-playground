export function fetchUser(userId){
  return { type: "USER_FETCH_REQUEST", payload: { userId:userId } }
}