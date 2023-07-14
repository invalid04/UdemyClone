'use client'
import Input from "@/app/(components)/inputs/input"
import ImageUpload from "@/app/(components)/inputs/ImageUpload"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { useState, ChangeEvent, FormEvent } from "react"

interface CourseProps {
    name?:string,
    imageSrc?:string,
    author?:string,
    price?:string,
    courseId?:string,
    description?:string | null
}

interface InitialStateProps {
    name:string,
    imageSrc:string,
    author:string,
    price:string,
    description:string
}

const initialState:InitialStateProps = {
    name:'',
    imageSrc:'',
    author:'',
    price:'',
    description:''
}

export default function UpdateCourseComponent({name, price, courseId, description, author, imageSrc}:CourseProps) {

    const [state,setState] = useState(initialState);
    const router = useRouter();

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value});
    }

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const onUpdate = (e:FormEvent) => {
        e.preventDefault();

        axios.put(`/api/course/${courseId}`, state)
        .then(() => {
            router.refresh();
        })
        .catch((error) => {
            throw new Error(error)
        })
        .finally(() => {
            router.push('/')
        })
    }

  return (
    <div className='flex justify-between'>

        <div className='flex flex-col justify-center items-center py-4'>
            <div >
                <img 
                    src={imageSrc} 
                    alt='image' 
                    className='h-[300px] w-[300px] bg-gray-50 border-black' 
                    />
                <h1>{name}</h1>
                <p>{price}</p>
                <p>{author}</p>
                <p>{description}</p>
            </div>
        </div>

        
        <form onSubmit={onUpdate} className='flex gap-2 my-[20px]'>
            <div className='h-[400px] w-[400px]'>
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>

            <div className='flex flex-col justify-center h-[350px] w-[350px]'>
                <Input big placeholder='Course Name' id='name' type='text' value={state.name} name='name' onChange={handleChange} />
                <Input big placeholder='Course Author' id='author' type='text' value={state.author} name='author' onChange={handleChange} />
                <Input big placeholder='Course Description' id='description' type='text' value={state.description} name='description' onChange={handleChange} />
                <Input big placeholder='Course Price' id='price' type='number' value={state.price} name='price' onChange={handleChange} />
                <button type='submit'>Submit</button>
            </div>
                
        </form>
    </div>
  )
}
