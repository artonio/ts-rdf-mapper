import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfPrefixes} from '../../main/annotations/RdfPrefixes';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfPrefixes({
    dswaComment: 'http://www.uhn.ca/dwsa/comment/',
    dswaCommentProperty: 'http://www.uhn.ca/dwsa/comment/property/',
    dswaProp: 'http://www.uhn.ca/dswa/property/',
    dswaSubElement: 'http://www.uhn.ca/dswa/template/subelement/',
    dswaSubElementProperty: 'http://www.uhn.ca/dswa/template/subelement/property/',
    dswaTemplate: 'http://www.uhn.ca/dswa/template/',
    owl: 'http://www.w3.org/2002/07/owl#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#'
})
@RdfBean('dswaSubElement:')
export class QaTemplateElement {
    /// represents various data types that are available in the DSWA
    static NUMERIC = 'numeric';
    static SELECTION = 'selection';
    static DATE = 'date';
    static DATE_TIME = 'date-time';
    static PERIOD = 'period';
    static STRING = 'string';
    static NOTE = 'note';

    AGroup: boolean;
    anElement: boolean;
    @RdfProperty({predicate: 'dswaSubElementProperty:constraintRule', xsdType: XSDDataType.XSD_STRING})
    constraintRule: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:constraintTag', xsdType: XSDDataType.XSD_STRING})
    constraintTag: string;

    dataType: string;

    @RdfProperty({predicate: 'dswaSubElementProperty:deprecated', xsdType: XSDDataType.XSD_BOOLEAN})
    deprecated: boolean;
    @RdfProperty({predicate: 'dswaSubElementProperty:diseaseSite', xsdType: XSDDataType.XSD_STRING})
    diseaseSite: string;

    @RdfProperty({predicate: 'dswaSubElementProperty:', clazz: QaTemplateElement, isArray: true})
    elements: QaTemplateElement[];

    @RdfProperty({predicate: 'dswaSubElementProperty:', clazz: QaTemplateElement, isArray: true})
    set _elements(value: QaTemplateElement[]) {
        value.sort((a, b) => {
            return a.index - b.index;
        });
        this.elements = value;
    }

    @RdfProperty({predicate: 'dswaSubElementProperty:graph', xsdType: XSDDataType.XSD_STRING})
    graph: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:help', xsdType: XSDDataType.XSD_STRING})
    help: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:htmlData', xsdType: XSDDataType.XSD_STRING})
    htmlData: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:htmlSnippet', xsdType: XSDDataType.XSD_STRING})
    htmlSnippet: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:htmlSummarySnippet', xsdType: XSDDataType.XSD_STRING})
    htmlSummarySnippet: string;

    @RdfProperty({predicate: 'dswaSubElementProperty:gindex', xsdType: XSDDataType.XSD_INTEGER})
    index: number;

    @RdfProperty({predicate: 'dswaSubElementProperty:label', xsdType: XSDDataType.XSD_STRING})
    label: string;

    @RdfProperty({predicate: 'dswaSubElementProperty:maxstring', xsdType: XSDDataType.XSD_INTEGER})
    maxstring: number;

    @RdfProperty({predicate: 'dswaSubElementProperty:path', xsdType: XSDDataType.XSD_STRING})
    path: string;
    rangeAliasSet: boolean;
    @RdfProperty({predicate: 'dswaSubElementProperty:rangePropertyIRI', xsdType: XSDDataType.XSD_STRING})
    rangePropertyIRI: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:repeating', xsdType: XSDDataType.XSD_BOOLEAN})
    repeating: boolean;
    @RdfProperty({predicate: 'dswaSubElementProperty:resourceAliasSet', xsdType: XSDDataType.XSD_BOOLEAN})
    resourceAliasSet: boolean;
    @RdfProperty({predicate: 'dswaSubElementProperty:resourceIRI', xsdType: XSDDataType.XSD_STRING})
    resourceIRI: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:tabletSnippet', xsdType: XSDDataType.XSD_STRING})
    tabletSnippet: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:tag', xsdType: XSDDataType.XSD_STRING})
    tag: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:tooltip', xsdType: XSDDataType.XSD_STRING})
    tooltip: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:validator', xsdType: XSDDataType.XSD_STRING})
    validator: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:isADataSource', xsdType: XSDDataType.XSD_BOOLEAN})
    isADataSource: boolean;

    @RdfProperty({predicate: 'dswaSubElementProperty:dataType', xsdType: XSDDataType.XSD_STRING})
    set _dataType(value: string) {
        this.dataType = value;
        if (value === 'group') {
            this.AGroup = true;
            this.anElement = false;
        } else {
            this.AGroup = false;
            this.anElement = true;
        }
    }
}

@RdfPrefixes({
    dswaComment: 'http://www.uhn.ca/dwsa/comment/',
    dswaCommentProperty: 'http://www.uhn.ca/dwsa/comment/property/',
    dswaProp: 'http://www.uhn.ca/dswa/property/',
    dswaSubElement: 'http://www.uhn.ca/dswa/template/subelement/',
    dswaSubElementProperty: 'http://www.uhn.ca/dswa/template/subelement/property/',
    dswaTemplate: 'http://www.uhn.ca/dswa/template/',
    owl: 'http://www.w3.org/2002/07/owl#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#'
})
@RdfBean('dswaTemplate:')
export class QaTemplate {
    basePath: string;
    @RdfProperty({predicate: 'dswaProp:chartId', xsdType: XSDDataType.XSD_STRING})
    chartId: string;
    @RdfProperty({predicate: 'dswaProp:clinicType', xsdType: XSDDataType.XSD_STRING})
    clinicType: string;
    @RdfProperty({predicate: 'dswaSubElementProperty:', clazz: QaTemplateElement})
    patientInformation: QaTemplateElement;
    @RdfProperty({predicate: 'dswaProp:revision', xsdType: XSDDataType.XSD_INTEGER})
    revision: number;
    revisionDate?: any;
    @RdfProperty({predicate: 'dswaProp:templateOwner', xsdType: XSDDataType.XSD_STRING})
    templateOwner: string;
    @RdfProperty({predicate: 'dswaProp:version', xsdType: XSDDataType.XSD_INTEGER})
    version: number;

}

export const templateTTL = `
@prefix dswaCommentProperty: <http://www.uhn.ca/dwsa/comment/property/> .
@prefix dswaProp: <http://www.uhn.ca/dswa/property/> .
@prefix dswaTemplate: <http://www.uhn.ca/dswa/template/> .
@prefix dswaSubElementProperty: <http://www.uhn.ca/dswa/template/subelement/property/> .
@prefix dswaComment: <http://www.uhn.ca/dwsa/comment/> .
@prefix owl:   <http://www.w3.org/2002/07/owl#> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix dswaSubElement: <http://www.uhn.ca/dswa/template/subelement/> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .

dswaComment:  a  rdfs:Class , rdfs:Resource .

rdfs:Class  a                owl:Class , rdfs:Class , rdfs:Resource ;
        rdfs:subClassOf      rdfs:Class , rdfs:Resource ;
        owl:equivalentClass  rdfs:Class .

rdfs:Resource  a             owl:Class , rdfs:Class , rdfs:Resource ;
        rdfs:subClassOf      rdfs:Resource ;
        owl:equivalentClass  rdfs:Resource .

dswaTemplate:  a  rdfs:Class , rdfs:Resource .

<http://www.uhn.ca/dswa/template/individual/HEAD_AND_NECK/copath/2>
        a                        dswaTemplate: ;
        dswaProp:chartId         "copath" ;
        dswaProp:clinicType      "HEAD_AND_NECK" ;
        dswaProp:description     [ a                           dswaComment: ;
                                   dswaCommentProperty:author  "" ;
                                   dswaCommentProperty:date    "" ;
                                   dswaCommentProperty:text    ""
                                 ] ;
        dswaProp:templateOwner   "antons" ;
        dswaProp:version         2 ;
        dswaSubElementProperty:  [ a                               dswaSubElement: ;
                                   dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                     dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                       dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                         dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                           dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                             dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:dataType
                                                                                                                                                                                                                                                       "string" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:deprecated
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlData
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:label    "Code" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:maxstring
                                                                                                                                                                                                                                                       200 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:repeating
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tag      "code" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:validator
                                                                                                                                                                                                                                                       ""
                                                                                                                                                                                                                                             ] ;
                                                                                                                                                                                                             dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:dataType
                                                                                                                                                                                                                                                       "string" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:deprecated
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:gindex   1 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlData
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:label    "Value" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:maxstring
                                                                                                                                                                                                                                                       200 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:repeating
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tag      "value" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:validator
                                                                                                                                                                                                                                                       ""
                                                                                                                                                                                                                                             ] ;
                                                                                                                                                                                                             dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:dataType
                                                                                                                                                                                                                     "group" ;
                                                                                                                                                                                                             dswaSubElementProperty:deprecated
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                                                             dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                             dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlData
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:label    "Grade Group" ;
                                                                                                                                                                                                             dswaSubElementProperty:maxstring
                                                                                                                                                                                                                     200 ;
                                                                                                                                                                                                             dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:repeating
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:tag      "gradeGroup" ;
                                                                                                                                                                                                             dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                             dswaSubElementProperty:validator
                                                                                                                                                                                                                     ""
                                                                                                                                                                                                           ] ;
                                                                                                                                                                           dswaSubElementProperty:constraintRule
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:constraintTag
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:dataType
                                                                                                                                                                                   "group" ;
                                                                                                                                                                           dswaSubElementProperty:deprecated
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:diseaseSite
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:gindex   2 ;
                                                                                                                                                                           dswaSubElementProperty:graph    "" ;
                                                                                                                                                                           dswaSubElementProperty:help     "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlData
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:isADataSource
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:label    "Grade" ;
                                                                                                                                                                           dswaSubElementProperty:maxstring
                                                                                                                                                                                   200 ;
                                                                                                                                                                           dswaSubElementProperty:path     "" ;
                                                                                                                                                                           dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:repeating
                                                                                                                                                                                   true ;
                                                                                                                                                                           dswaSubElementProperty:resourceIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tag      "grade" ;
                                                                                                                                                                           dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                           dswaSubElementProperty:validator
                                                                                                                                                                                   ""
                                                                                                                                                                         ] ;
                                                                                                                                         dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                           dswaSubElementProperty:constraintRule
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:constraintTag
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:dataType
                                                                                                                                                                                   "date" ;
                                                                                                                                                                           dswaSubElementProperty:deprecated
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:diseaseSite
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                           dswaSubElementProperty:graph    "" ;
                                                                                                                                                                           dswaSubElementProperty:help     "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlData
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:isADataSource
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:label    "Diagnosis Date" ;
                                                                                                                                                                           dswaSubElementProperty:maxstring
                                                                                                                                                                                   200 ;
                                                                                                                                                                           dswaSubElementProperty:path     "" ;
                                                                                                                                                                           dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:repeating
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:resourceIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tag      "diagnosisDate" ;
                                                                                                                                                                           dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                           dswaSubElementProperty:validator
                                                                                                                                                                                   ""
                                                                                                                                                                         ] ;
                                                                                                                                         dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                           dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                             dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:dataType
                                                                                                                                                                                                                                                       "string" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:deprecated
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:gindex   1 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlData
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:label    "Value" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:maxstring
                                                                                                                                                                                                                                                       200 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:repeating
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tag      "value" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:validator
                                                                                                                                                                                                                                                       ""
                                                                                                                                                                                                                                             ] ;
                                                                                                                                                                                                             dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:dataType
                                                                                                                                                                                                                                                       "string" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:deprecated
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlData
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:label    "Code" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:maxstring
                                                                                                                                                                                                                                                       200 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:repeating
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tag      "code" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:validator
                                                                                                                                                                                                                                                       ""
                                                                                                                                                                                                                                             ] ;
                                                                                                                                                                                                             dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:dataType
                                                                                                                                                                                                                     "group" ;
                                                                                                                                                                                                             dswaSubElementProperty:deprecated
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                                                             dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                             dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlData
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:label    "Stage Group" ;
                                                                                                                                                                                                             dswaSubElementProperty:maxstring
                                                                                                                                                                                                                     200 ;
                                                                                                                                                                                                             dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:repeating
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:tag      "stageGroup" ;
                                                                                                                                                                                                             dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                             dswaSubElementProperty:validator
                                                                                                                                                                                                                     ""
                                                                                                                                                                                                           ] ;
                                                                                                                                                                           dswaSubElementProperty:constraintRule
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:constraintTag
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:dataType
                                                                                                                                                                                   "group" ;
                                                                                                                                                                           dswaSubElementProperty:deprecated
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:diseaseSite
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:gindex   3 ;
                                                                                                                                                                           dswaSubElementProperty:graph    "" ;
                                                                                                                                                                           dswaSubElementProperty:help     "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlData
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:isADataSource
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:label    "Stage" ;
                                                                                                                                                                           dswaSubElementProperty:maxstring
                                                                                                                                                                                   200 ;
                                                                                                                                                                           dswaSubElementProperty:path     "" ;
                                                                                                                                                                           dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:repeating
                                                                                                                                                                                   true ;
                                                                                                                                                                           dswaSubElementProperty:resourceIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tag      "stage" ;
                                                                                                                                                                           dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                           dswaSubElementProperty:validator
                                                                                                                                                                                   ""
                                                                                                                                                                         ] ;
                                                                                                                                         dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                           dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                             dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:dataType
                                                                                                                                                                                                                                                       "string" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:deprecated
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:gindex   1 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlData
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:label    "Value" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:maxstring
                                                                                                                                                                                                                                                       200 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:repeating
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tag      "value" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:validator
                                                                                                                                                                                                                                                       ""
                                                                                                                                                                                                                                             ] ;
                                                                                                                                                                                                             dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:dataType
                                                                                                                                                                                                                                                       "string" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:deprecated
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlData
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:label    "Code" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:maxstring
                                                                                                                                                                                                                                                       200 ;
                                                                                                                                                                                                                                               dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:repeating
                                                                                                                                                                                                                                                       false ;
                                                                                                                                                                                                                                               dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                                                       "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tag      "code" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                                                               dswaSubElementProperty:validator
                                                                                                                                                                                                                                                       ""
                                                                                                                                                                                                                                             ] ;
                                                                                                                                                                                                             dswaSubElementProperty:constraintRule
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:constraintTag
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:dataType
                                                                                                                                                                                                                     "group" ;
                                                                                                                                                                                                             dswaSubElementProperty:deprecated
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:diseaseSite
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:gindex   0 ;
                                                                                                                                                                                                             dswaSubElementProperty:graph    "" ;
                                                                                                                                                                                                             dswaSubElementProperty:help     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlData
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:isADataSource
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:label    "Histology Type Group" ;
                                                                                                                                                                                                             dswaSubElementProperty:maxstring
                                                                                                                                                                                                                     200 ;
                                                                                                                                                                                                             dswaSubElementProperty:path     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:repeating
                                                                                                                                                                                                                     false ;
                                                                                                                                                                                                             dswaSubElementProperty:resourceIRI
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                                                     "" ;
                                                                                                                                                                                                             dswaSubElementProperty:tag      "histologyTypeGroup" ;
                                                                                                                                                                                                             dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                                                             dswaSubElementProperty:validator
                                                                                                                                                                                                                     ""
                                                                                                                                                                                                           ] ;
                                                                                                                                                                           dswaSubElementProperty:constraintRule
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:constraintTag
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:dataType
                                                                                                                                                                                   "group" ;
                                                                                                                                                                           dswaSubElementProperty:deprecated
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:diseaseSite
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:gindex   1 ;
                                                                                                                                                                           dswaSubElementProperty:graph    "" ;
                                                                                                                                                                           dswaSubElementProperty:help     "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlData
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:isADataSource
                                                                                                                                                                                   false ;
                                                                                                                                                                           dswaSubElementProperty:label    "Histology Type" ;
                                                                                                                                                                           dswaSubElementProperty:maxstring
                                                                                                                                                                                   200 ;
                                                                                                                                                                           dswaSubElementProperty:path     "" ;
                                                                                                                                                                           dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:repeating
                                                                                                                                                                                   true ;
                                                                                                                                                                           dswaSubElementProperty:resourceIRI
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tabletSnippet
                                                                                                                                                                                   "" ;
                                                                                                                                                                           dswaSubElementProperty:tag      "histologyType" ;
                                                                                                                                                                           dswaSubElementProperty:tooltip  "" ;
                                                                                                                                                                           dswaSubElementProperty:validator
                                                                                                                                                                                   ""
                                                                                                                                                                         ] ;
                                                                                                                                         dswaSubElementProperty:constraintRule
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:constraintTag
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:dataType
                                                                                                                                                 "group" ;
                                                                                                                                         dswaSubElementProperty:deprecated
                                                                                                                                                 false ;
                                                                                                                                         dswaSubElementProperty:diseaseSite
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:gindex   0 ;
                                                                                                                                         dswaSubElementProperty:graph    "" ;
                                                                                                                                         dswaSubElementProperty:help     "" ;
                                                                                                                                         dswaSubElementProperty:htmlData
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:htmlSnippet
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:htmlSummarySnippet
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:isADataSource
                                                                                                                                                 false ;
                                                                                                                                         dswaSubElementProperty:label    "Pathology Report" ;
                                                                                                                                         dswaSubElementProperty:maxstring
                                                                                                                                                 200 ;
                                                                                                                                         dswaSubElementProperty:path     "" ;
                                                                                                                                         dswaSubElementProperty:rangePropertyIRI
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:repeating
                                                                                                                                                 false ;
                                                                                                                                         dswaSubElementProperty:resourceIRI
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:tabletSnippet
                                                                                                                                                 "" ;
                                                                                                                                         dswaSubElementProperty:tag      "pathologyReport" ;
                                                                                                                                         dswaSubElementProperty:tooltip  "" ;
                                                                                                                                         dswaSubElementProperty:validator
                                                                                                                                                 ""
                                                                                                                                       ] ;
                                                                                                       dswaSubElementProperty:constraintRule
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:constraintTag
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:dataType
                                                                                                               "group" ;
                                                                                                       dswaSubElementProperty:deprecated
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:diseaseSite
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:gindex   0 ;
                                                                                                       dswaSubElementProperty:graph    "" ;
                                                                                                       dswaSubElementProperty:help     "" ;
                                                                                                       dswaSubElementProperty:htmlData
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSummarySnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:isADataSource
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:label    "Pathology Reports" ;
                                                                                                       dswaSubElementProperty:maxstring
                                                                                                               200 ;
                                                                                                       dswaSubElementProperty:path     "" ;
                                                                                                       dswaSubElementProperty:rangePropertyIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:repeating
                                                                                                               true ;
                                                                                                       dswaSubElementProperty:resourceIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tabletSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tag      "pathologyReports" ;
                                                                                                       dswaSubElementProperty:tooltip  "" ;
                                                                                                       dswaSubElementProperty:validator
                                                                                                               ""
                                                                                                     ] ;
                                                                     dswaSubElementProperty:constraintRule
                                                                             "" ;
                                                                     dswaSubElementProperty:constraintTag
                                                                             "" ;
                                                                     dswaSubElementProperty:dataType
                                                                             "group" ;
                                                                     dswaSubElementProperty:deprecated
                                                                             false ;
                                                                     dswaSubElementProperty:diseaseSite
                                                                             "" ;
                                                                     dswaSubElementProperty:gindex   1 ;
                                                                     dswaSubElementProperty:graph    "" ;
                                                                     dswaSubElementProperty:help     "" ;
                                                                     dswaSubElementProperty:htmlData
                                                                             "" ;
                                                                     dswaSubElementProperty:htmlSnippet
                                                                             "" ;
                                                                     dswaSubElementProperty:htmlSummarySnippet
                                                                             "" ;
                                                                     dswaSubElementProperty:isADataSource
                                                                             true ;
                                                                     dswaSubElementProperty:label    "Copath" ;
                                                                     dswaSubElementProperty:maxstring
                                                                             200 ;
                                                                     dswaSubElementProperty:path     "" ;
                                                                     dswaSubElementProperty:rangePropertyIRI
                                                                             "" ;
                                                                     dswaSubElementProperty:repeating
                                                                             false ;
                                                                     dswaSubElementProperty:resourceIRI
                                                                             "" ;
                                                                     dswaSubElementProperty:tabletSnippet
                                                                             "" ;
                                                                     dswaSubElementProperty:tag      "copath" ;
                                                                     dswaSubElementProperty:tooltip  "" ;
                                                                     dswaSubElementProperty:validator
                                                                             ""
                                                                   ] ;
                                   dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                     dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                       dswaSubElementProperty:constraintRule
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:constraintTag
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:dataType
                                                                                                               "string" ;
                                                                                                       dswaSubElementProperty:deprecated
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:diseaseSite
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:gindex   1 ;
                                                                                                       dswaSubElementProperty:graph    "" ;
                                                                                                       dswaSubElementProperty:help     "" ;
                                                                                                       dswaSubElementProperty:htmlData
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSummarySnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:isADataSource
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:label    "Last Name" ;
                                                                                                       dswaSubElementProperty:maxstring
                                                                                                               200 ;
                                                                                                       dswaSubElementProperty:path     "" ;
                                                                                                       dswaSubElementProperty:rangePropertyIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:repeating
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:resourceIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tabletSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tag      "lastName" ;
                                                                                                       dswaSubElementProperty:tooltip  "" ;
                                                                                                       dswaSubElementProperty:validator
                                                                                                               ""
                                                                                                     ] ;
                                                                     dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                       dswaSubElementProperty:constraintRule
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:constraintTag
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:dataType
                                                                                                               "numeric" ;
                                                                                                       dswaSubElementProperty:deprecated
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:diseaseSite
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:gindex   3 ;
                                                                                                       dswaSubElementProperty:graph    "" ;
                                                                                                       dswaSubElementProperty:help     "" ;
                                                                                                       dswaSubElementProperty:htmlData
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSummarySnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:isADataSource
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:label    "Age" ;
                                                                                                       dswaSubElementProperty:maxstring
                                                                                                               200 ;
                                                                                                       dswaSubElementProperty:path     "" ;
                                                                                                       dswaSubElementProperty:rangePropertyIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:repeating
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:resourceIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tabletSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tag      "age" ;
                                                                                                       dswaSubElementProperty:tooltip  "" ;
                                                                                                       dswaSubElementProperty:validator
                                                                                                               ""
                                                                                                     ] ;
                                                                     dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                       dswaSubElementProperty:constraintRule
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:constraintTag
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:dataType
                                                                                                               "string" ;
                                                                                                       dswaSubElementProperty:deprecated
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:diseaseSite
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:gindex   0 ;
                                                                                                       dswaSubElementProperty:graph    "" ;
                                                                                                       dswaSubElementProperty:help     "" ;
                                                                                                       dswaSubElementProperty:htmlData
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSummarySnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:isADataSource
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:label    "First Name" ;
                                                                                                       dswaSubElementProperty:maxstring
                                                                                                               200 ;
                                                                                                       dswaSubElementProperty:path     "" ;
                                                                                                       dswaSubElementProperty:rangePropertyIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:repeating
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:resourceIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tabletSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tag      "firstName" ;
                                                                                                       dswaSubElementProperty:tooltip  "" ;
                                                                                                       dswaSubElementProperty:validator
                                                                                                               ""
                                                                                                     ] ;
                                                                     dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                       dswaSubElementProperty:constraintRule
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:constraintTag
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:dataType
                                                                                                               "date" ;
                                                                                                       dswaSubElementProperty:deprecated
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:diseaseSite
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:gindex   2 ;
                                                                                                       dswaSubElementProperty:graph    "" ;
                                                                                                       dswaSubElementProperty:help     "" ;
                                                                                                       dswaSubElementProperty:htmlData
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSummarySnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:isADataSource
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:label    "Birth Date" ;
                                                                                                       dswaSubElementProperty:maxstring
                                                                                                               200 ;
                                                                                                       dswaSubElementProperty:path     "" ;
                                                                                                       dswaSubElementProperty:rangePropertyIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:repeating
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:resourceIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tabletSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tag      "birthDate" ;
                                                                                                       dswaSubElementProperty:tooltip  "" ;
                                                                                                       dswaSubElementProperty:validator
                                                                                                               ""
                                                                                                     ] ;
                                                                     dswaSubElementProperty:         [ a                               dswaSubElement: ;
                                                                                                       dswaSubElementProperty:constraintRule
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:constraintTag
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:dataType
                                                                                                               "string" ;
                                                                                                       dswaSubElementProperty:deprecated
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:diseaseSite
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:gindex   4 ;
                                                                                                       dswaSubElementProperty:graph    "" ;
                                                                                                       dswaSubElementProperty:help     "" ;
                                                                                                       dswaSubElementProperty:htmlData
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:htmlSummarySnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:isADataSource
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:label    "Gender" ;
                                                                                                       dswaSubElementProperty:maxstring
                                                                                                               200 ;
                                                                                                       dswaSubElementProperty:path     "" ;
                                                                                                       dswaSubElementProperty:rangePropertyIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:repeating
                                                                                                               false ;
                                                                                                       dswaSubElementProperty:resourceIRI
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tabletSnippet
                                                                                                               "" ;
                                                                                                       dswaSubElementProperty:tag      "gender" ;
                                                                                                       dswaSubElementProperty:tooltip  "" ;
                                                                                                       dswaSubElementProperty:validator
                                                                                                               ""
                                                                                                     ] ;
                                                                     dswaSubElementProperty:constraintRule
                                                                             "" ;
                                                                     dswaSubElementProperty:constraintTag
                                                                             "" ;
                                                                     dswaSubElementProperty:dataType
                                                                             "group" ;
                                                                     dswaSubElementProperty:deprecated
                                                                             false ;
                                                                     dswaSubElementProperty:diseaseSite
                                                                             "" ;
                                                                     dswaSubElementProperty:gindex   0 ;
                                                                     dswaSubElementProperty:graph    "" ;
                                                                     dswaSubElementProperty:help     "" ;
                                                                     dswaSubElementProperty:htmlData
                                                                             "" ;
                                                                     dswaSubElementProperty:htmlSnippet
                                                                             "" ;
                                                                     dswaSubElementProperty:htmlSummarySnippet
                                                                             "" ;
                                                                     dswaSubElementProperty:isADataSource
                                                                             true ;
                                                                     dswaSubElementProperty:label    "Demographics" ;
                                                                     dswaSubElementProperty:maxstring
                                                                             200 ;
                                                                     dswaSubElementProperty:path     "" ;
                                                                     dswaSubElementProperty:rangePropertyIRI
                                                                             "" ;
                                                                     dswaSubElementProperty:repeating
                                                                             false ;
                                                                     dswaSubElementProperty:resourceIRI
                                                                             "" ;
                                                                     dswaSubElementProperty:tabletSnippet
                                                                             "" ;
                                                                     dswaSubElementProperty:tag      "demographics" ;
                                                                     dswaSubElementProperty:tooltip  "" ;
                                                                     dswaSubElementProperty:validator
                                                                             ""
                                                                   ] ;
                                   dswaSubElementProperty:constraintRule
                                           "" ;
                                   dswaSubElementProperty:constraintTag
                                           "" ;
                                   dswaSubElementProperty:dataType
                                           "group" ;
                                   dswaSubElementProperty:deprecated
                                           false ;
                                   dswaSubElementProperty:diseaseSite
                                           "" ;
                                   dswaSubElementProperty:gindex   0 ;
                                   dswaSubElementProperty:graph    "default" ;
                                   dswaSubElementProperty:help     "" ;
                                   dswaSubElementProperty:htmlData
                                           "" ;
                                   dswaSubElementProperty:htmlSnippet
                                           "" ;
                                   dswaSubElementProperty:htmlSummarySnippet
                                           "" ;
                                   dswaSubElementProperty:isADataSource
                                           false ;
                                   dswaSubElementProperty:label    "Patient Information" ;
                                   dswaSubElementProperty:maxstring
                                           9999 ;
                                   dswaSubElementProperty:path     "" ;
                                   dswaSubElementProperty:rangePropertyIRI
                                           "" ;
                                   dswaSubElementProperty:repeating
                                           true ;
                                   dswaSubElementProperty:resourceIRI
                                           "" ;
                                   dswaSubElementProperty:tabletSnippet
                                           "" ;
                                   dswaSubElementProperty:tag      "patientInformation" ;
                                   dswaSubElementProperty:tooltip  "" ;
                                   dswaSubElementProperty:validator
                                           ""
                                 ] .

owl:Class  a                 owl:Class , rdfs:Class , rdfs:Resource ;
        rdfs:subClassOf      owl:Class , rdfs:Class , rdfs:Resource ;
        owl:equivalentClass  owl:Class .

dswaSubElement:  a  rdfs:Class , rdfs:Resource .

`;
