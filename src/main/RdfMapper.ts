import 'reflect-metadata';
import {DeserializerProcessor} from './processors/DeserializerProcessor';
import {SerializerProcessor} from './processors/SerializerProcessor';

export class RdfMapper {
    /**
     * @throws - [[IllegalArgumentError]]
     * @param target
     */
    public static serialize<T>(target: T): string {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor();
        return serializerProcessor.serialize(target);
    }

    /**
     * @throws - [[TurtleParseError]]
     * @param type
     * @param ttlData
     */
    public static async deserializeAsync<T>(type: { new(): T }, ttlData: string): Promise<T> {
        const deserializeProcessor: DeserializerProcessor = new DeserializerProcessor();
        return deserializeProcessor.deserializeAsync(type, ttlData);
    }

    public static deserialize<T>(type: { new(): T }, ttlData: string): T {
        const deserializeProcessor: DeserializerProcessor = new DeserializerProcessor();
        return deserializeProcessor.deserialize(type, ttlData);
    }

}
