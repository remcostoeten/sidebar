"use client";

import Image from "next/image";
import {Sidebar} from "@/components/ui/sidebar-component"
import CommandPalette from "@/components/ui/command-palette"
import { useRef } from "react";
import { useFeatureFlag } from "@/components/ui/feature-flags-provider";

export default function Home() 
{
  const commandPaletteRef = useRef<any>(null);
  const showCommandPalette = useFeatureFlag("commandPalette");
  
  return (
    <div className='w-screen h-screen flex items-end'>
      {showCommandPalette && <CommandPalette ref={commandPaletteRef} />}
      <Sidebar onSearchClick={() => commandPaletteRef.current?.open()} />
    </div>      
      
  )
}
