import { Traverse, ObjectTraverser } from "./util/object/objectTraverser";

export class Composite
{
    children: Array<any>;
    traverse = new ObjectTraverser(['children']);
}