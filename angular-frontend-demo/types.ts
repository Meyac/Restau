interface Cards {
    name: string,
    location: string,
    customers: number,
    id: number
}

interface SpecificCard extends Array<Array<any>> {}

export {Cards, SpecificCard};