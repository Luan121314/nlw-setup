import {PrismaClient} from '@prisma/client'
import FastiFy from 'fastify'
import cors from '@fastify/cors'

const app = FastiFy()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async ()=>{
    const habits = await prisma.habit.findMany({
        where: {
            title:{
                startsWith: 'Beber'
            }
        }
    })

    return habits
})

app.listen({
    port: 3333
}).then(()=>{
    console.log("HTTP server running");
    
})
