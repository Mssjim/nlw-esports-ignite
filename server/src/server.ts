import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/games', async(req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.status(200).json(games);
});

app.get('/games/:id/ads', async(req, res)=>{
    const id = req.params.id;

    const ads = await prisma.ad.findMany({
        where: {
            gameId: id
        },
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return res.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }));
});

app.post('/games/:id/ads', async(req, res) => {
    const id = req.params.id;

    const query = await prisma.ad.create({
        data: {
            ...req.body,
            gameId: id,
            weekDays: req.body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(req.body.hourStart),
            hourEnd: convertHourStringToMinutes(req.body.hourEnd)
        }
    });
    
    return res.status(200).json({
        id: query.id
    });
});

app.get('/ads/:id/discord', async(req, res) => {
    const id = req.params.id;

    const data = await prisma.ad.findUnique({
        where: { id },
        select: {
            discord: true
        }
    });
    
    return res.status(200).json({
        discord: data?.discord ?? ''
    });
});

app.listen(3333);