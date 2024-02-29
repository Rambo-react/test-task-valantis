const makeUniqArray = (arr) => {
  const filteredArray = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (!filteredArray.some((element) => element.id === item.id)) {
      filteredArray.push(item)
    }
  }

  // arr.filter((item) => {
  //   if (!filteredArray.some((element) => element.id === item.id)) {
  //     filteredArray.push(item)
  //   }
  // })
  return filteredArray
}

export default makeUniqArray
