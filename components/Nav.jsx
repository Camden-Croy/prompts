"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
            src="/images/logo-color.svg"
            alt='Promptopia Logo'
            width={60}
            height={60}
            />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Mobile Navigation */}
        <div className='sm:flex hidden'>
          {isUserLoggedIn ? <div className='flex gap-3 md:gap-5'></div> : <></>}
        </div>

    </nav>
  )
}

export default Nav;