

import { Items, ItemDetail } from '../type';
import 'dotenv/config';

export const getItemsMeli = async (query: string, offset: number, limit: number) => {

    const data  = await fetch(`${process.env.URL}/sites/MLA/search?q=${query}&offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .catch((error) => {
            console.log(error);
        });

    const itemsData: Items = {
        author: {name: "Andre", lastname: "Suaza"},
        categories: [],
        items: []
    };

    if( data && data.results.length > 0 ) {

        data.results.map( (result, index: number) => {
            itemsData.items[index] = {
                id: result.id,
                title: result.title,
                price: {
                    currency:result.currency_id,
                    amount: result.price,
                    decimals: 0,
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shipping: result.shipping?.free_shipping
            };

            if(!itemsData.categories.find(category => category === result.category_id))
                itemsData.categories.push(result.category_id);
            
        } );
        
    }

    
   return itemsData;
}

export const getItemByIdMeli = async (id: string) => {

    const data  = await fetch(`${process.env.URL}/items/${id}`)
        .then(response => response.json())
        .catch((error) => {
            console.log(error);
        });

    const dataDescription  = await fetch(`${process.env.URL}/items/${id}/description`)
        .then(response => response.json())
        .catch((error) => {
            console.log(error);
        });

    if( data ) {    

        const itemsData: ItemDetail = {
            author: {
                name: "Andre",
                lastname: "Suaza"
            },
            id: data.id,
            title: data.title,
            price: {
                currency:data.currency_id,
                amount: data.price,
                decimals: 0,
            },
            picture: data.thumbnail,
            condition: data.condition,
            free_shipping: data.shipping?.free_shipping,
            sold_quantity: data.initial_quantity,
            description: dataDescription ?  dataDescription.plain_text : ""
        };

        return itemsData;
    }

    
   return {};
}