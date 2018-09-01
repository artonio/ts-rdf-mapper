import 'reflect-metadata';
import {DeserializerProcessor} from './processors/DeserializerProcessor';
import {SerializerProcessor} from './processors/SerializerProcessor';

export class RdfMapper {
    public static serialize<T>(target: T): string {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor();
        return serializerProcessor.serialize(target);
    }

    public static async deserialize<T>(type: { new(): T }, ttlData: string): Promise<T> {
        const deserializeProcessor: DeserializerProcessor = new DeserializerProcessor();
        return deserializeProcessor.deserialize(type, ttlData);
    }

}
