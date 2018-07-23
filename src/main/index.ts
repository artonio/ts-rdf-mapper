import 'reflect-metadata';

// A property decorator that takes no arguments
export function logProperty(target: any, key: string) {

    let value = target[key];

    const getter = function() {
        console.log(`Get => ${key}`);
        return value;
    };

    const setter = function(newVal) {
        console.log(`Set: ${key} => ${newVal}`);
        value = newVal;
    };

    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
