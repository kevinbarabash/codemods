fn.bind(obj);
fn.bind(obj, a);
fn.bind(obj, a, b);

(...args) => fn(a, ...args);
(...args) => fn(a, b, ...args);
