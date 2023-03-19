'use strict'

class fenwick_tree {
  #n
  #tree
  constructor(n) {
    this.#n = n
    this.#tree = new Array(n + 1).fill(0)
  }

  add (i, x) {
    for (i++; i <= this.#n; i += i & -i) {
      this.#tree[i] += x
    }
  }

  sum (i) {
    let s = 0
    for (i++; i > 0; i -= i & -i) {
      s += this.#tree[i]
    }
    return s
  }

  sum_range (l, r) {
    return this.sum(r) - this.sum(l - 1)
  }

  lower_bound (x) {
    let i = 0
    let s = 0
    for (let k = 1 << Math.floor(Math.log2(this.#n)); k > 0; k >>= 1) {
      if (i + k <= this.#n && s + this.#tree[i + k] < x) {
        s += this.#tree[i + k]
        i += k
      }
    }
    return i
  }

  upper_bound (x) {
    let i = 0
    let s = 0
    for (let k = 1 << Math.floor(Math.log2(this.#n)); k > 0; k >>= 1) {
      if (i + k <= this.#n && s + this.#tree[i + k] <= x) {
        s += this.#tree[i + k]
        i += k
      }
    }
    return i
  }

  kth (k) {
    return this.lower_bound(k + 1)
  }

  max_right (l, f) {
    let sum = 0
    if (l < 0) {
      return -1
    }
    let i = l
    for (let k = 1 << Math.floor(Math.log2(this.#n)); k > 0; k >>= 1) {
      if (i + k <= this.#n && sum + this.#tree[i + k] < f) {
        sum += this.#tree[i + k]
        i += k
      }
    }
    return i
  }

  min_left (r, f) {
    let sum = 0
    if (r >= this.#n) {
      return this.#n
    }
    let i = r
    for (let k = 1 << Math.floor(Math.log2(this.#n)); k > 0; k >>= 1) {
      if (i - k >= 0 && sum + this.#tree[i - k] < f) {
        sum += this.#tree[i - k]
        i -= k
      }
    }
    return i
  }

  get size () {
    return this.#n
  }
}

function init (args) {
  let n = 0
  if (typeof args === 'number') { 
    n = args
    return new fenwick_tree(n)
  }
  if (typeof args === 'array') {
    n = args.length
    const ft = new fenwick_tree(n)
    for (let i = 0; i < n; i++) {
      ft.add(i, args[i])
    }
    return ft
  }
}

module.exports = {
  init
}