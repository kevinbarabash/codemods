const checks = [
    'isArray', 'isFunction', 'isString', 'isFinite', 'isUndefined'
];

module.exports = (file, api) => {
    const j = api.jscodeshift;

    const root = j(file.source);

    return root
        .find(j.CallExpression)
        .filter(p => {
            const callee = p.value.callee;
            if (callee.type === 'MemberExpression') {
                const {object, property} = callee;
                if (object.name === '_' && checks.indexOf(property.name) !== -1) {
                    return true;
                }
            }
            return false;
        })
        .replaceWith(p => {
            const {property} = p.value.callee;
            const {arguments: args} = p.value;

            switch (property.name) {
                case 'isArray':
                    return j.callExpression(
                        j.memberExpression(
                            j.identifier('Array'),
                            j.identifier('isArray')
                        ),
                        args
                    );
                case 'isFunction':
                    return j.binaryExpression(
                        '===',
                        j.unaryExpression('typeof', args[0]),
                        j.literal('function')
                    );
                case 'isString':
                    return j.binaryExpression(
                        '===',
                        j.unaryExpression('typeof', args[0]),
                        j.literal('string')
                    );
                case 'isFinite':
                    return j.callExpression(
                        j.memberExpression(
                            j.identifier('Number'),
                            j.identifier('isFinite')
                        ),
                        args
                    );
                case 'isUndefined':
                    return j.binaryExpression(
                        '===',
                        j.unaryExpression('typeof', args[0]),
                        j.literal('undefined')
                    );
                default:
                    break;
            }
        })
        .toSource();
};
