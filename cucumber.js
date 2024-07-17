// module.exports = {
//   default: `use-cases/sub-product-use-cases/*.feature --require use-cases/sub-product-use-cases/*.spec.js --format-options '{"snippetInterface": "synchronous"}' --publish-quiet`
// };

module.exports = {
  default: `use-cases/*/*.feature --require use-cases/*/*.spec.js --format-options '{"snippetInterface": "synchronous"}' --publish-quiet`
};
