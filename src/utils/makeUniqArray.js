const makeUniqArray = (arr) => {
  const filteredArray = []
  arr.filter((item) => {
    if (!filteredArray.some((element) => element.id === item.id)) {
      filteredArray.push(item)
    }
  })
  return filteredArray
}
export default makeUniqArray
