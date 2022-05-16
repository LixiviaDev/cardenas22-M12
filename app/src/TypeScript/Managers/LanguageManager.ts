import React from "react";
import { Singleton } from "../DesingPatterns/Singleton";
import { Languages } from "../Enums/Language.enum";

import es from '../Languages/es.json';
import en from '../Languages/en.json';
import ca from '../Languages/ca.json';

export class LanguageManager {
    protected static instance: LanguageManager;
    private es: object = es;
    private en: object = en;
    private ca: object = ca;

    private currentLanguage : string = localStorage.getItem("lang") ?? Languages.ES;

    private constructor() { }

    public static getInstance(): LanguageManager {
        if (!LanguageManager.instance) {
            LanguageManager.instance = new LanguageManager();
        }

        return LanguageManager.instance;
    }

    public changeAppLanguage(newLanguage : Languages) : void {
        localStorage.setItem("lang", newLanguage);
        window.location.reload();
    }

    public setAppLanguage() : void {
        document.documentElement.lang = this.currentLanguage;
    }

    public get(path : string) : string {
        let pathEval = `this.${this.currentLanguage}.${path}`;

        return eval(pathEval);
    }
}