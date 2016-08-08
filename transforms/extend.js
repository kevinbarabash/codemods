function transformer(file, api) {
    const j = api.jscodeshift;

    const root = j(file.source);

    return root
        .find(j.CallExpression)
        .filter(p => {
            const callee = p.value.callee;
            if (callee.type === 'MemberExpression') {
                const {object, property} = callee;
                if (object.name === '_' && property.name === 'extend') {
                    return true;
                }
            }
            return false;
        })
        .replaceWith(p => {
            const {object, property} = p.value.callee;
            const {arguments: args} = p.value;

            if (args[0].type === 'ObjectExpression' && args[0].properties.length === 0) {
                const [ , ...rest] = args;
                return j.objectExpression(
                    rest.map((arg) => j.spreadProperty(arg))
                );
            } else {
                return j.callExpression(
                    j.memberExpression(
                        j.identifier('Object'), j.identifier('assign')
                    ),
                    args
                );
            }
        })
        .toSource();
}

module.exports = transformer;
