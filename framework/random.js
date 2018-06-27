function integer(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1))
}

function boolean() {
   return !!integer(0, 1);
}

module.exports = {
  integer,
  boolean
}