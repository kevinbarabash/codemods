const methods = ['bind', 'partial'];

module.exports = (file, api) => {
    const j = api.jscodeshift;

    const root = j(file.source);

    return root
        .find(j.CallExpression)
        .filter(p => {
            const callee = p.value.callee;
            if (callee.type === 'MemberExpression') {
                const {object, property} = callee;
                if (object.name === '_' && methods.indexOf(property.name) !== -1) {
                    return true;
                }
            }
            return false;
        })
        .replaceWith(p => {
            const {property} = p.value.callee;
            const {arguments: args} = p.value;
            const [fn, ...rest] = args;

            switch (property.name) {
                case 'bind':
                    return j.callExpression(
                        j.memberExpression(fn, j.identifier('bind')),
                        rest
                    );
                case 'partial':
                    // TODO: handle _.partial(fn, a, _, c)
                    return j.arrowFunctionExpression(
                        [j.restElement(j.identifier('args'))],
                        j.callExpression(
                            fn,
                            [...rest, j.spreadElement(j.identifier('args'))]
                        )
                    );
            }

        })
        .toSource();
};


var partiallyAppliedFn = (...args) => fn(5, 10, ...args);
