export class Utils {
    public static getType(instance: any, key: string): any {
        return Reflect.getMetadata('design:type', instance, key);
    }

    public static isArrayType(instance: any, key: string): boolean {
        return Array === Utils.getType(instance, key);
    }
}
