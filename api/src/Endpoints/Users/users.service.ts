import { Injectable } from '@nestjs/common';
import { MangaBriefInfoData } from 'src/Common/CustomTypes/Manga';
import { UserBriefData } from 'src/Common/CustomTypes/User';
import UsersRepository from './users.repository';

require('dotenv').config();
const configData = require('../../../config.js');

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

@Injectable()
export default class UsersService {
    async getAll(): Promise<UserBriefData[]> {
        return await UsersRepository.getAll();
    }
    async getOne(userId: string): Promise<UserBriefData> {
        return await UsersRepository.getOne(userId);
    }
}