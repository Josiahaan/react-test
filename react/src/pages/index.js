import Image from 'next/image'
import { Inter } from 'next/font/google'
import Main from '../layouts/main';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Main />
    </div>
  )
}
