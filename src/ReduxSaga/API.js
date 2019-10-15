export default {
  fetchUser(id){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === "1") {
          resolve({ id: 1, name: "Jerry", age: 20 });
        } else {
          reject("user request false");
        }
      }, 1000);
    });
  }
}