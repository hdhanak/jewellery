import { Connection } from 'typeorm';
import { PostgresDataSource } from '../../config/db';
import { Metal } from '../entity/metal.entity';

export class MetalSeeder {
    public async run(connection: Connection): Promise<void> {
        const metalRepository = PostgresDataSource.getRepository(Metal);

        const metals = [
            { metal_name: 'Silver', status: true },
            { metal_name: 'Gold', status: true },
            { metal_name: 'Platinum', status: true },
        ];

        for (const metal of metals) {
            const existingMetal = await metalRepository.findOne({ where: { metal_name: metal.metal_name } });
            if (!existingMetal) {
                const newMetal = metalRepository.create(metal);
                await metalRepository.save(newMetal);
            }
        }

        console.log('Metal seeder completed!');
    }
}
