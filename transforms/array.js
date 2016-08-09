const methods = ['first', 'head', 'last', 'tail', 'rest'];

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

            switch (property.name) {
                case 'first':
                case 'head':
                    if (args.length === 1) {
                        return j.memberExpression(
                            args[0],
                            j.literal(0),
                            true
                        );
                    } else {
                        return j.callExpression(
                            j.memberExpression(args[0], j.identifier('slice')),
                            [j.literal(0), args[1]]
                        );
                    }
                case 'rest':
                case 'tail':
                    if (args.length === 1) {
                        return j.callExpression(
                            j.memberExpression(args[0], j.identifier('slice')),
                            [j.literal(1)]
                        );
                    } else {
                        return j.callExpression(
                            j.memberExpression(args[0], j.identifier('slice')),
                            [args[1]]
                        )
                    }
                    break;
                case 'last':
                    if (args.length === 1) {
                        return j.memberExpression(
                            args[0],
                            j.binaryExpression(
                                '-',
                                j.memberExpression(args[0], j.identifier('length')),
                                j.literal(1)
                            ),
                            true
                        );
                    } else {
                        return j.callExpression(
                            j.memberExpression(args[0], j.identifier('slice')),
                            [j.binaryExpression(
                                '-',
                                j.memberExpression(args[0], j.identifier('length')),
                                args[1]
                            )]
                        );
                    }
                    break;
            }

        })
        .toSource();
};
