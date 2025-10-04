
import { NextResponse } from "next/server";



export default function middlewareauth(req){
    const token=req.cookies.get('token') || req.headers.get('authorization');

    if(!token && req.nextUrl.pathname.startsWith('/admin')){
        return NextResponse.redirect(new URL('/admin/login'),req.url)
    }
}