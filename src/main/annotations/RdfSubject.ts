import {IRdfSubjectMetadata} from './interfaces/IRdfSubjectMetadata';

const makeRDFSubjectMapper = <T>(prototype: any, key: string, prop: any) => {
    const values = new Map<any, T>();
    const metadataValForDesirealization: IRdfSubjectMetadata = {key: key, val: null, prop: prop};
    Reflect.defineMetadata('RdfSubject-non-instance', metadataValForDesirealization, prototype);
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    const metadataValForSirealization: IRdfSubjectMetadata = {key: key, val: value, prop: prop};
                    Reflect.defineMetadata('RdfSubject', metadataValForSirealization, this);
                    values.set(this, value);
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
};

export const RdfSubject = (prop: string) => {
    return (target: Object, key: string) => {
        makeRDFSubjectMapper(target, key, prop);
    };
};
