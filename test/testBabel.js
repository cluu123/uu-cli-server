module.exports = function () {
    // const t = babel.types;
    return {
        // visitor: {
        //     VariableDeclarator(path, state) {
        //         // VariableDeclarator 是要找的变量声明
        //         // if (path.node.id.name == "a") {
        //             // 方式一：直接修改name
        //             // path.node.id.name = 'b';
        //             // 方式二：把id是a的ast换成b的ast
        //             // path.node.id = t.Identifier("b");
        //         // }
        //         // path.node.id = t.Identifier("b");
        //         // console.log(path.node.id);
        //     },
        //     AwaitExpression(path) {
        //         const a = path.findParent(p => p.isTryStatement())

        //         let node = path.node;

        //         // 在父路径节点中查找声明 async 函数的节点
        //         // async 函数分为4种情况：函数声明 || 箭头函数 || 函数表达式 || 对象的方法
        //         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));

        //         // 获取async的方法名
        //         let asyncName = '';

        //         let type = asyncPath.node.type;

        //         switch (type) {
        //             // 1️⃣函数表达式
        //             // 情况1：普通函数，如const func = async function () {}
        //             // 情况2：箭头函数，如const func = async () => {}
        //             case 'FunctionExpression':
        //             case 'ArrowFunctionExpression':
        //             // 使用path.getSibling(index)来获得同级的id路径
        //             let identifier = asyncPath.getSibling('id');
        //             // 获取func方法名
        //             asyncName = identifier && identifier.node ? identifier.node.name : '';
        //             console.log(identifier.node);
        //             break;

        //             // 2️⃣函数声明，如async function fn2() {}
        //             case 'FunctionDeclaration':
        //             asyncName = (asyncPath.node.id && asyncPath.node.id.name) || '';
        //             break;

        //             // 3️⃣async函数作为对象的方法，如vue项目中，在methods中定义的方法: methods: { async func() {} }
        //             case 'ObjectMethod':
        //             asyncName = asyncPath.node.key.name || '';
        //             break;
        //         }
        //         console.log(asyncName);
        //         // 若asyncName不存在，通过argument.callee获取当前执行函数的name
        //         let funcName = asyncName || (node.argument.callee && node.argument.callee.name) || '';

        //         const temp = template(tryTemplate);

        //         // 给模版增加key，添加console.log打印信息
        //         let tempArgumentObj = {
        //             // 通过types.stringLiteral创建字符串字面量
        //             CatchError: types.stringLiteral(catchConsole(filePath, funcName, options.customLog))
        //         };

        //         // 通过temp创建try语句
        //         let tryNode = temp(tempArgumentObj);
        //         // 获取async节点(父节点)的函数体
        //         let info = asyncPath.node.body;

        //         // 将父节点原来的函数体放到try语句中
        //         tryNode.block.body.push(...info.body);

        //         // 将父节点的内容替换成新创建的try语句
        //         info.body = [tryNode];

        //     }
        // }
    };
};
