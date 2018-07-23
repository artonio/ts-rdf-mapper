export const RdfSubject = (prop: string) => {
    return (target: Object, key: string) => {
        let value = target[key];

        const getter = () => {
            // console.log(`Get => ${key}`);
            return value;
        };

        const setter = (newVal) => {
            // console.log(`Set: ${key} => ${newVal}`);
            value = newVal;
            Reflect.defineMetadata('RdfSubject', {key: key, val: value, prop: prop}, target);
        };

        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }

    };
}
