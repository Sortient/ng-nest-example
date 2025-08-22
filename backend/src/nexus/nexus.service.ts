import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class NexusService {
    private readonly nexusUrl?: string;
    private readonly auth: string;

    constructor(private configService: ConfigService) {
        this.nexusUrl = this.configService.get<string>('NEXUS_URL');
        const username = this.configService.get<string>('NEXUS_USERNAME');
        const password = this.configService.get<string>('NEXUS_PASSWORD');
        this.auth = Buffer.from(`${username}:${password}`).toString('base64');
    }

    async uploadFile(repository: string, file: Express.Multer.File): Promise<string> {
        const url = `${this.nexusUrl}/repository/${repository}/${file.originalname}`;

        try {
            await axios.put(url, file.buffer, {
                headers: {
                    'Authorization': `Basic ${this.auth}`,
                    'Content-Type': file.mimetype,
                },
            });
            return url;
        }
        catch (error) {
            console.error('Error uploading file to Nexus:', error);
            throw new Error('Failed to upload file to Nexus');
        }
    }
}