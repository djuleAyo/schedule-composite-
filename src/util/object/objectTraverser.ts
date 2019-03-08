export class ObjectTraverser
{
    static traverse(obj: any, cb: Function, conf?: Traverse.conf)
    {
        cb(conf ? conf.name : 'root', obj);
        if (typeof(obj) !== 'object') {
            // recursion does use key passing so only root level may come with no name
            return;
        } else {
            traverseChildren(obj, cb, conf ? conf.fieldsToTraverse : undefined);
        }
    }

    constructor(
        private fields?: Array<string>
    ) {}

    traverse(obj: any, cb: Function, conf?: Traverse.conf) {
        ObjectTraverser.traverse(
            obj, cb, {
                name: conf ? conf.name : undefined, fieldsToTraverse: this.fields
            });
    }

}

export module Traverse
{
    export interface conf
    {
        fieldsToTraverse?: Array<string>,
        name: string
    }
}

function traverseChildren(obj: Object, cb: Function, fieldsToTraverse: Array<string>)
{
    for (const key in obj) {
        const value = obj[key];
        if (isFieldToTraverse(key, fieldsToTraverse)) {
            // cb(key, value);
            ObjectTraverser.traverse(value, cb, {fieldsToTraverse, name: key});
        }
    }
}
function isFieldToTraverse(field: string, fieldsToTraverse: Array<string>)
{
    if (!fieldsToTraverse) return true;
    return fieldsToTraverse.find(
        fieldToTraverse => fieldToTraverse === field
    ) !== undefined;
}


// ✅❓ ------------------------------------------------------------------------

let test = {
    a: {
        b: [1, 2, 3]
    },
    b: "hello"
}
if (process.argv.length > 1 && process.argv[2] === 'sa-test')
    ObjectTraverser.traverse(test, ((key, value) => console.log(key, value)));