"use client"

import { useState } from "react";


export default function Filter() {

  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button className="bg-[#454444]">
      Headphone Type
      </button>
      <button>
        Categoria 1
      </button>
      <button>
        Categoria 2
      </button>
    </div>
  );
}
