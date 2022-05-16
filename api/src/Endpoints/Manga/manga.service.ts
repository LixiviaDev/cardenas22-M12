import { Injectable } from '@nestjs/common';
import { MangaPreviewCardData } from 'src/Common/CustomTypes/Manga';
import { ChapterData } from 'src/Common/Tables/ChapterData';
import { MangaInfoData } from 'src/Common/Tables/MangaInfoData';
import { User, UserJWT } from '../../Common/CustomTypes/User';
import MangaRepository from './manga.repository';

require('dotenv').config();
const configData = require('../../../config.js');

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

@Injectable()
export default class MangaService {
    async addManga(mangaInfoData: MangaInfoData, mangaName: string): Promise<void> {
        await MangaRepository.addManga(mangaInfoData, mangaName);
    }

    async addChapter(chapterData: ChapterData, chapterImages: string[]): Promise<void> {
        await MangaRepository.addChapter(chapterData, chapterImages);
    }

    async testMangaPreviewCard(page: number): Promise<MangaPreviewCardData[]> {
        let res = await MangaRepository.testMangaPreviewCard(page);

        return res;
    }
}
