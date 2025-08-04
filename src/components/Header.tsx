// src/components/Header.tsx

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/">
          <div className="logo">STREAMIFYY</div>
        </Link>
      </div>
    </header>
  );
}