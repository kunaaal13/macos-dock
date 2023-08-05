import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Inter } from 'next/font/google'
import { useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-end p-24 ${inter.className} pb-10 bg-white`}
    >
      {/* Dock */}
      <Dock />
    </main>
  )
}

function Dock() {
  const arr = new Array(10).fill('a')

  let mouseX = useMotionValue(Infinity)

  return (
    <div
      className='mx-auto flex h-16 items-end pb-3 gap-4 rounded-2xl px-4 bg-black/30'
      onMouseMove={(e) => {
        mouseX.set(e.pageX)
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {arr.map((item, index) => (
        <AppIcon key={index} mouseX={mouseX} />
      ))}
    </div>
  )
}

function AppIcon({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    }

    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(distance, [-200, 0, 200], [40, 80, 40])
  let width = useSpring(widthSync, { stiffness: 200, damping: 15, mass: 0.1 })
  return (
    <motion.div
      ref={ref}
      style={{
        width,
      }}
      className='aspect-square w-10 rounded-full bg-black/75'
    />
  )
}
