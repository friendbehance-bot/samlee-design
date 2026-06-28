"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import data from "@/../content/i18n.json";

type Lang = "zh" | "en";
type I18nData = Record<string, Record<string, any>>;
const i18nData = data as unknown as I18nData;

const Ctx = createContext<{lang:Lang; t:(k:string)=>string; toggle:()=>void}>({ lang:"zh", t:()=>"", toggle:()=>{} });

export function LangProvider({children}:{children:React.ReactNode}) {
  const [lang, setLang] = useState<Lang>("zh");
  useEffect(() => { const s = localStorage.getItem("lang") as Lang; if (s==="en"||s==="zh") setLang(s); }, []);
  const toggle = useCallback(() => {
    setLang(prev => { const next = prev==="zh"?"en":"zh"; localStorage.setItem("lang", next); return next; });
  }, []);
  const t = useCallback((k:string)=>{
    const keys = k.split(".");
    let o:any = i18nData[lang];
    for (const kk of keys) {
      if (o === undefined || o === null) return k;
      o = o[kk];
    }
    return (o !== undefined && o !== null) ? String(o) : k;
  }, [lang]);
  return React.createElement(Ctx.Provider, {value:{lang,t,toggle}}, children);
}

export function useLang() { return useContext(Ctx); }
