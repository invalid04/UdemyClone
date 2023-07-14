'use client'
import Input from "../(components)/inputs/input"
import Button from '../(components)/Button'
import { useState, ChangeEvent, FormEvent } from "react"
import ImageUpload from "../(components)/inputs/ImageUpload"
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface InitialValue {
  name?:string,
  imageSrc:string,
  author:string,
  description:string,
  price:number
}

const initialValue:InitialValue = {
  name:'',
  imageSrc:'',
  author:'',
  description:'',
  price:0
}

export default function page() {

  const [state, setState] = useState(initialValue);
  const router = useRouter();

  function handleChange(event:ChangeEvent<HTMLInputElement>) {
    setState({...state, [event.target.name]: event.target.value})
  }

  const setCustomValue = (id:any, value:any) => {
    setState((prevState) => ({
      ...prevState,
      [id] :value
    }))
  }

  const onSubmit = (e:FormEvent) => {
    e.preventDefault();

    axios.post('/api/course', state)
    .then(() => {
      router.push('/')
    })
    .catch((err) => {
      throw new Error(err)
    }) 

    router.refresh()
  }

  return (
    <div className='flex justify-center'>
      <form className='w=[600px] h-[700px] py-12 flex flex-col items-center gap-4' onSubmit={onSubmit}> 
        
        <div className='w-[500px]'>
          <ImageUpload
            value={state.imageSrc} 
            onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>

        <div className='flex flex-col gap-2 py-4'>
            <Input big placeholder='Course Name' id='name' type='text' value={state.name} name='name' onChange={handleChange} />
            <Input big placeholder='Author' id='author' type='text' value={state.author} name='author' onChange={handleChange} />
            <Input big placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange} />
            <Input big placeholder='Price' id='price' type='number' value={state.price} name='price' onChange={handleChange} />
        </div>

        
          <Button 
            label='Submit'
            type='Submit'
            />
        


      </form>
    </div>
  )
}
