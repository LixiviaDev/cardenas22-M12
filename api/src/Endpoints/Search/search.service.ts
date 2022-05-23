import { Injectable } from '@nestjs/common';
import { MangaBriefInfoData } from 'src/Common/CustomTypes/Manga';
import SearchRepository from './search.repository';

require('dotenv').config();
const configData = require('../../../config.js');

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

@Injectable()
export default class SearchService {
    async manga(search: string): Promise<MangaBriefInfoData[]> {
        return await SearchRepository.manga(search);
    }
}