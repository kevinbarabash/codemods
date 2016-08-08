module.exports = (file, api) => {
    const j = api.jscodeshift;

    const root = j(file.source);

    return root
        .find(j.CallExpression)
        .filter(p => {
            const callee = p.value.callee;
            if (callee.type === 'MemberExpression') {
                const {object, property} = callee;
                if (object.name === '_' && property.name === 'first') {
                    return true;
                }
            }
            return false;
        })
        .replaceWith(p => {
            const {object, property} = p.value.callee;
            const {arguments: args} = p.value;

            if (args.length === 1) {
                return j.memberExpression(
                    args[0],
                    j.literal(0),
                    true
                );
            } else {
                return j.callExpression(
                    j.memberExpression(
                        args[0],
                        j.identifier('slice')
                    ),
                    [
                        j.literal(0),
                        args[1],
                    ]
                )
            }
        })
        .toSource();
};
