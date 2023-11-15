
interface Price {
    "currency": String,
    "amount": Number,
    "decimals": Number,
}

interface Author {
    "name": String
    "lastname": String
}

interface Item {
    "id": String,
    "title": String,
    "picture": String,
    "condition": String,
    "price": Price,
    "free_shipping": Boolean,
}

interface ItemDetail extends Item {
    "author": Author,
    "sold_quantity": Number
    "description": String
}

export interface Items {
    "author": Author,
    "categories": string[],
    "items": Item[]
}

