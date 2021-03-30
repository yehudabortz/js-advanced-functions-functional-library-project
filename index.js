const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function (collection, callback) {
      // let newCollection = collection.slice()
      let newCollection = Array.isArray(collection) ? collection.slice() : Object.values(collection)

      for (let indx = 0; indx < newCollection.length; indx++ ) {
        callback(newCollection[indx])
      }

      return collection
    },

    map: function (collection, callback) {
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }
      let newArray = []

      for (let indx = 0; indx < collection.length; indx++) {
        newArray.push(callback(collection[indx]))
      }
      return newArray
    },

    reduce: function(collection, callback, acc=0) {
      if (!acc) {
        acc = collection[0]
        collection = collection.slice(1)
      }

      for (let i = 0; i < collection.length; i++) {
        acc = callback(acc, collection[i], collection)
      }
      return acc
    },

    find: function (collection, predicate) {
      for (let i = 0; i < collection.length; i++) {
        if (!!predicate(collection[i])) {
          return collection[i]
        }   
      }
    },

    filter: function (collection, predicate) {
      let filtered = []
      for (let i = 0; i < collection.length; i++) {
        if (!!predicate(collection[i])) {
          filtered.push(collection[i])
        }   
      }
      return filtered
    },

    size: function (collection) {
      if (!Array.isArray(collection)) {
        return Object.values(collection).length
      } else {
        return collection.length
      }
    },

    first: function (array, n) {
      if (!n) {
        return array[0]
      } else {
        return array.slice(0,n)
      }
    },
      
    last: function (array, n) {
      if (!n) {
        return array[array.length - 1]
      } else {
        return array.slice(array.length - n)
      }
    },
      
    compact: function (array) {
    return this.filter(array, a => {
      if (a !== "" || a !== false || a !== null || a !== 0) {
          return a
        }
      })
    },

    sortBy: function (array, callback) {
      const newArray = [...array]
      return newArray.sort(function (a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },
    
    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function (object) {
      return Object.keys(object)
    },

    values: function (object) {
      return Object.values(object)
    },

    functions: function (object) {
      const functionNames = []

      for (let key in object) {
        if (typeof object[key] === "function") {
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },


  }
})()

fi.libraryMethod()
