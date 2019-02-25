import { AbstractTreeNode } from '../annotations/interfaces/AbstractTreeNode';
export declare class DeserializerProcessor {
    private readonly xsdType;
    constructor();
    deserializeAsync<T>(type: {
        new (): T;
    }, ttlData: string): Promise<T>;
    deserialize<T>(type: {
        new (): T;
    }, ttlData: string): T;
    deserializeTree<T extends AbstractTreeNode>(type: {
        new (): T;
    }, ttlData: string): T;
    private processTree;
    private process;
    private processPrimitiveByXSDType;
    private getNumTriplesByBeanType;
    private getQuadsAndPrefixes;
    private getQuads;
    private makeLiteral;
    private makePredicate;
}
