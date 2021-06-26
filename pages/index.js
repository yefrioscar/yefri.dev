import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function Home () {
  return (
    <div className='wrapper-container'>
      <div className='bg-green-300 w-full flex justify-center'>
        <div className='w-56 my-20'>
          <h1 className='font-bold text-2xl'>Hi, Im Yefri</h1>
          <input type="text" placeholder='email' className='rounded bg-gray-200 pl-2 h-10 w-full' />
        </div>
      </div>
    </div>
  )
}
