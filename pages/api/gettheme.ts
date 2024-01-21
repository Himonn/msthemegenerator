import type { NextApiRequest, NextApiResponse } from 'next'
import generateTheme from "@/lib/themegenerator";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let { primary, secondary  } = req.query

        if (!primary || !secondary || !(typeof primary === "string") || !(typeof secondary === "string")){

            return res.status(400).json({ message: "Error with primary or secondary hex code" });;
        }

        if (!primary.startsWith("#")){
            primary = `#${primary}`
        }

        if (!secondary.startsWith("#")){
            secondary = `#${secondary}`
        }

        let {palette: theme} = generateTheme(primary, "#323130", "#ffffff");

        theme['themeDarkAlt'] = secondary;
        theme['themeDarker'] = secondary;
        theme['accent'] = secondary;

        res.status(200).json({ message: "Success!", theme: theme })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}