import { readFileU8Async } from './filereader'

// const files = [
//   {
//     path: '/dossier/ion-logo-twitter.svg',
//     data: '1',
//   },
//   {
//     path: '/dossier/ion-logo-twitter/hy.svg',
//     data: '2',
//   },
//   {
//     path: 'a/ion-logo-twitter/hy',
//     data: '2',
//   },
//   {
//     path: 'hey.txt',
//     data: '3',
//   },
// ]

// let obj = {}

// TODO: Type those functions
export function updateObjProp(obj: any, value: any, propPath: string): any {
  const [head, ...rest] = propPath.replace(/^\/|\/$/g, '').split('/')

  return !rest.length ? (obj[head] = value) : updateObjProp(obj[head], value, rest.join('/'))
}

// let processFile = function (i) {
//   let file = files[i]

//   file.path
//     .replace(/^\/|\/$/g, '')
//     .split('/')
//     .reduce(function (r, e, idx) {
//       console.log('---')

//       console.log(idx)
//       console.log('---')
//       return r[e] || (r[e] = {})
//     }, obj)
//   updateObjProp(obj, file.data, file.path)
// }

// for (let i = 0; i < files.length; ++i) {
//   processFile(i)
// }

// console.log(JSON.stringify(obj, null, 2))

// find other name for filesWithPathsToNestedObjects :

// TODO: use callback to check level of compression outside this function and readFileU8Async

export async function nestPathsIntoObject(files: any) {
  let obj = {}

  await files.forEach(async (file: any) => {
    file.path
      .replace(/^\/|\/$/g, '')
      .split('/')
      .reduce(function (r: any, e: any, idx: any, arr: any) {
        // return r[e] || (r[e] = {}) // previous version with {} insides
        return r[e] || (arr.length - 1 == idx ? (r[e] = []) : (r[e] = {}))
      }, obj)

    await updateObjProp(
      obj,

      await readFileU8Async(file),

      file.path
    )
  })

  return obj
}