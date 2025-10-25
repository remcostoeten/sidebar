"use client";

import Image from "next/image";
import Link from "next/link";
import {Sidebar} from "@/components/ui/sidebar-component"
import CommandPalette from "@/components/ui/command-palette"
import { useRef } from "react";
import { useFeatureFlag } from "@/components/ui/feature-flags-provider";

export default function Home()
{
  const commandPaletteRef = useRef<any>(null);
  const showCommandPalette = useFeatureFlag("commandPalette");

  return (
    <div className='w-screen h-screen flex '>
      <div>
        {showCommandPalette && <CommandPalette ref={commandPaletteRef} />}
        <Sidebar onSearchClick={() => commandPaletteRef.current?.open()} />
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-neutral-800/40 aspect-video rounded-xl flex items-center justify-center">
              <p className=' text-xl text-neutral-600'>Source code <Link className='underline' href='https://github.com/remcostoeten/sidebar' target='_blank'>here</Link>.</p>
            </div>
            <div className="bg-neutral-800/40 aspect-video rounded-xl" />
            <div className="bg-neutral-800/40 aspect-video rounded-xl" />
          </div>
          <div className="bg-neutral-800/40  flex-1 rounded-xl md:min-h-min" />
        </main>
    </div>

  )
}
