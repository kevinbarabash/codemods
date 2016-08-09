# codemods
A collection of codemods for performing automated code refactoring.

# Usage

These codemods require `jscodeshift` so let's start by installing that.

    npm install -g jscodeshift

Then check out this repo.

    git clone https://github.com/kevinbarabash/codemods

Finally, run one of the codemods on your code.

    jscodeshift -t /path/to/transforms/transform.js /path/to/your/code

# Transforms

Multiple transforms are grouped into a single codemod.  Some transforms output
ES2016+ code.  Please check the output and verify that the code will work for
you before committing changes.

### array.js

- `_.head(x) -> x[0]`
- `_.head(x, n) -> x.slice(n)`
- `_.first` (alias for `_.head`)
- `_.tail(x) -> x.slice(1)`
- `_.tail(x, n) -> x.slice(n)`
- `_.rest` (alias for `_.tail`)
- `_.last(x) -> x[x.length - 1]`
- `_.last(x, n) -> x.slice(x.length - n)`

### function.js

- `_.bind(fn, obj, ...x) -> fn.bind(obj, ...x)`
- `_.partial(fn, a, b); -> (...args) => fn(a, b, ...args)`

### object.js

- `_.clone(x) -> { ...x }`
- `_.extend({}, x, y) -> { ...x, ...y }`
- `_.extend(obj, x, y) -> Object.assign(obj, x, y)`
- `_.keys(x) -> Object.keys(x)`
- `_.pairs(x) -> Object.entries(x)`
- `_.values(x) -> Object.values(x)`

### util.js

- `_.isArray(x) -> Array.isArray(x)`
- `_.isBoolean(x) -> typeof(x) === 'boolean'`
- `_.isFinite(x) -> Number.isFinite(x)`
- `_.isFunction(x) -> typeof(x) === 'function'`
- `_.isNull(x) -> x === null`
- `_.isString(x) -> typeof(x) === 'string'`
- `_.isUndefined(x) -> typeof(x) === 'undefined'`
