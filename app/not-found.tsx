"use client"
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import React from "react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority={true}
      />
      <div className="p-6 w-1/3 text-center rounded-lg shadow-md ">
        <h1 className="font-bold text-3xl mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button variant="outline" className="mt-4 ml-2 " onClick={()=> (window.location.href= '/')}>
            Back To Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
