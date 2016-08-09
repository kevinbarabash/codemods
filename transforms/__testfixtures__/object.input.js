var point = _.clone({x:5, y:10});
var obj2 = _.clone(obj);

const objB = _.extend({}, objA, objB);
const obj = _.extend({}, {x: 5, y: 10});
_.extend(this, objA, objB);
_.extend({x: 5, y: 10}, objA, objB);

_.keys({x:5, y:10});
_.keys(obj);

_.values({x:5, y:10});
_.values(obj);

_.pairs({x:5, y:10});
_.pairs(obj);
