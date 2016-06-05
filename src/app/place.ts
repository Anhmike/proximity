export interface Place {
    name:string,
    type:string,
    location?:Location,
    id?:string
}

export interface Location {
    lat:number,
    lng:number
}

export interface PlaceDetails {
    address:string,
    phone:string,
    openingHours:string[], 
    rating:number, 
    website:string 
}
