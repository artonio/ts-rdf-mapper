import 'reflect-metadata';
import {DeserializerProcessor} from './processors/DeserializerProcessor';
import {SerializerProcessor} from './processors/SerializerProcessor';

export class RdfMapper {
    public static serialize(target: any) {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor(target);
        return serializerProcessor.serialize(target);
    }

    public static async deserialize <T>(type: { new(): T }, ttlData: string): Promise<T> {
        const deserializeProcessor: DeserializerProcessor = new DeserializerProcessor();
        return deserializeProcessor.deserialize(type, ttlData);
    }

}
