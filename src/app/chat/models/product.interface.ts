/*
Model representing single Product information
*/
export interface IProduct {
    productId: string;
    productName: string;
    shortDescription?: string;
    longDescription?:  string;
    price: string;
    productImage: string;
    reviewRating: number;
    reviewCount: number;
    inStock: Boolean;
}
export interface ProductContent {
    id: string;
    products: Array<IProduct>;
 }
