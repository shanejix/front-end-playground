
export default function shallowEqual(objA, objB) {


  // console.log(objA,objB);


  if (objA === objB) {

    return true
  }

  if (typeof objA !== 'object' || objA === null) {
    return false
  }


  if (typeof objB !== 'object' || objB === null) {
    return false
  }


  let keysA = Object.keys(objA)
  let keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  //diff A's keys and B's keys

  for (let i = 0; i < keysA; i++) {

    // console.log(objA[keysA[i]], objB[keysA[i]]);

    if (!objB.hasownProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}
