import 'reflect-metadata';
import { AbstractTreeNode } from './annotations/interfaces/AbstractTreeNode';
export declare class RdfMapper {
    /**
     * @throws - [[IllegalArgumentError]]
     * @param target
     */
    static serialize<T>(target: T): string;
    /**
     * @throws - [[TurtleParseError]]
     * @param type
     * @param ttlData
     */
    static deserializeAsync<T>(type: {
        new (): T;
    }, ttlData: string): Promise<T>;
    static deserialize<T>(type: {
        new (): T;
    }, ttlData: string): T;
    static deserializeTree<T extends AbstractTreeNode>(type: {
        new (): T;
    }, ttlData: string): T;
}
