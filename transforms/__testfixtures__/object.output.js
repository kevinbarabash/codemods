var point = {
  ...{x:5, y:10}
};
var obj2 = {
  ...obj
};

const objB = {
  ...objA,
  ...objB
};
const obj = {
  ...{x: 5, y: 10}
};
Object.assign(this, objA, objB);
Object.assign({x: 5, y: 10}, objA, objB);

Object.keys({x:5, y:10});
Object.keys(obj);

Object.values({x:5, y:10});
Object.values(obj);

Object.entries({x:5, y:10});
Object.entries(obj);
