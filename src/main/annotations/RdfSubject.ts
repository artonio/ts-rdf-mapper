const makeRDFSubjectMapper = <T>(prototype: any, key: string, prop: any, mapper: (value: any) => T) => {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    Reflect.defineMetadata('RdfSubject', {key: key, val: value, prop: prop}, this);
                    values.set(this, mapper(value));
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
        makeRDFSubjectMapper(target, key, prop, (value: any) => {
            return value;
        });
    };
};
