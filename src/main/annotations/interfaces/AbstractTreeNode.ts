import {RdfProperty} from '../RdfProperty';
import {XSDDataType} from '../XSDDataType';

export abstract class AbstractTreeNode {
    @RdfProperty({predicate: 'http://ts-rdf-mapper.com#isRootNode', xsdType: XSDDataType.XSD_BOOLEAN})
    isRoot;
}
