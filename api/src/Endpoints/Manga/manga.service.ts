import { Injectable } from '@nestjs/common';
import { ChapterImage } from 'src/Common/CustomTypes/Chapter';
import { MangaBriefInfoData, MangaInfoData, MangaManagementData, MangaPreviewCardData } from 'src/Common/CustomTypes/Manga';
import { ChapterData} from 'src/Common/Tables/ChapterData';
import MangaInfoDataTable from 'src/Common/Tables/MangaInfoData';
import { User, UserJWT } from '../../Common/CustomTypes/User';
import MangaRepository from './manga.repository';

require('dotenv').config();
const configData = require('../../../config.js');

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

@Injectable()
export default class MangaService {
    async getOneBrief(mangaId: string): Promise<MangaBriefInfoData> {
        let res = await MangaRepository.getOneBrief(mangaId);

        return res;
    }

    async addManga(mangaInfoData: MangaInfoDataTable, mangaName: string): Promise<void> {
        await MangaRepository.addManga(mangaInfoData, mangaName);
    }

    async addChapter(chapterData: ChapterData, chapterImages: string[]): Promise<void> {
        await MangaRepository.addChapter(chapterData, chapterImages);
    }

    async testMangaPreviewCard(page: number): Promise<MangaPreviewCardData[]> {
        let res = await MangaRepository.testMangaPreviewCard(page);

        return res;
    }

    async info(mangaId: string): Promise<MangaInfoData> {
        let res = await MangaRepository.info(mangaId);

        res.artists = res.artists?.toString().split("=");
        res.authors = res.authors?.toString().split("=");
        res.tags = res.tags?.toString().split("=");

        return res;
    }

    async managementData(mangaId: string): Promise<MangaManagementData> {
        let res = await MangaRepository.managementData(mangaId);

        res.artists = res.artists?.toString().split("|");
        res.authors = res.authors?.toString().split("|");
        res.tags = res.tags?.toString().split("|");

        return res;
    }

    async chapterList(mangaId: string, mangaServerId: number): Promise<ChapterData[]> {
        let res = await MangaRepository.chapterList(mangaId, mangaServerId);

        return res;
    }

    async chapterImages(mangaId: string, mangaServerId: number, chapterId: number): Promise<ChapterImage[]> {
        let res = await MangaRepository.chapterImages(mangaId, mangaServerId, chapterId);

        return res;
    }

    async addWriter(mangaId: string, name: string): Promise<void> {
        await MangaRepository.addWriter(mangaId, name);
    }

    async removeWriter(mangaId: string, name: string): Promise<void> {
        await MangaRepository.removeWriter(mangaId, name);
    }

    async addArtist(mangaId: string, name: string): Promise<void> {
        await MangaRepository.addArtist(mangaId, name);
    }

    async removeArtist(mangaId: string, name: string): Promise<void> {
        await MangaRepository.removeArtist(mangaId, name);
    }

    async addTag(mangaId: string, tagId: string): Promise<void> {
        await MangaRepository.addTag(mangaId, tagId);
    }

    async removeTag(mangaId: string, tagId: string): Promise<void> {
        await MangaRepository.removeTag(mangaId, tagId);
    }

    async changeTitle(mangaId: string, title: string): Promise<void> {
        await MangaRepository.changeTitle(mangaId, title);
    }

    async changeState(mangaId: string, mangaServerId: string, state: string): Promise<void> {
        await MangaRepository.changeState(mangaId, mangaServerId, state);
    }

    async changeSinopsis(mangaId: string, mangaServerId: string, sinopsis: string): Promise<void> {
        await MangaRepository.changeSinopsis(mangaId, mangaServerId, sinopsis);
    }
}
