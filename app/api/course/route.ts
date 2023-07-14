import prisma from '../../lib/prismadb'
import myUser from '@/app/actions/getUser'
import { NextResponse } from 'next/server'

export async function POST (request:Request) {
    const currentUser = await myUser();
    
    if(!currentUser) {
        return console.log('No user registered');
    }

    const body = await request.json();

    const {
        name,
        author,
        imageSrc,
        description,
        price
    } = body

    const course = await prisma.course.create({
        data: {
            name,
            author,
            imageSrc,
            description,
            price,
            userId:currentUser.id
        }
    })

    return NextResponse.json(course)
}