
import { routes } from "./lib"


export const getPages = async (slug: string) => {
    const endpont = routes.PAGES + "?slug=" + slug
    const response = await fetch(endpont, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(`Error fetching pages: ${response.statusText}`)
    }

    const data = await response.json()
    return data
}