import RatioImage from "@/CommonComponent/RatioImage";
import SVG from "@/CommonComponent/SVG";
import { ImagePath } from "@/Constant";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import { Badge } from "reactstrap";
import React from "react";


export const ProductListTableData = [
    {
        image: "product_list/product-categories/laptop.png",
        name: "Apple Desktop 2023",
        sku: "02145YK796",
        category: "Laptops",
        price: 56000.0,
        quantity: 13,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/phone.png",
        name: "Apple iphone 13 Pro",
        sku: "56379FG3AW",
        category: "Smart Phones",
        price: 19000.0,
        quantity: 48,
        status: "In Stock",
        rating: 3,
    },
    {
        image: "product_list/product-categories/headphone.png",
        name: "Headphones",
        sku: "33KR5689B1",
        category: "Smart Headphones",
        price: 10000.0,
        quantity: 5,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/wireless-headphone.png",
        name: "Wireless-headphone",
        sku: "AD6789HEY0",
        category: "Smart Headphones",
        price: 15000.0,
        quantity: 4,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/1.png",
        name: "Wood Chair",
        sku: "456DF78DFQ",
        category: "Furniture",
        price: 99000.0,
        quantity: 2,
        status: "Sold Out",
        rating: 5,
    },
    {
        image: "email-template/3.png",
        name: "Wood Chair",
        sku: "5633GD3K54",
        category: "Furniture",
        price: 1000.0,
        quantity: 8,
        status: "Sold Out",
        rating: 5,
    },
    {
        image: "product_list/product-categories/ipad.png",
        name: "MacBook Air 13.3-inch",
        sku: "589KO8PPQ8",
        category: "Laptops",
        price: 45000.0,
        quantity: 10,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/mouse.png",
        name: "M185 Compact Wireless Mouse",
        sku: "02145YK796",
        category: "E-Commerce",
        price: 56000.0,
        quantity: 13,
        status: "Sold Out",
        rating: 3,
    },
    {
        image: "other-images/cart-img.jpg",
        name: "Wood chairs",
        sku: "568GH3LLQ2",
        category: "Furniture",
        price: 78000.0,
        quantity: 50,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/watch.png",
        name: "Smart watch",
        sku: "58FR7K34F6",
        category: "Electric",
        price: 25000.0,
        quantity: 48,
        status: "Sold Out",
        rating: 5,
    },
    {
        image: "product_list/product-categories/dvd.png",
        name: "DVD",
        sku: "HG5667DFQ1",
        category: "Electric",
        price: 5600.0,
        quantity: 10,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/speaker.png",
        name: "Speakers",
        sku: "02145YK796",
        category: "Electric",
        price: 12200.0,
        quantity: 50,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/phone.png",
        name: "Apple iphone 13 Pro",
        sku: "56379FG3AW",
        category: "Smart Phones",
        price: 19000.0,
        quantity: 48,
        status: "In Stock",
        rating: 3,
    },
    {
        image: "product_list/product-categories/headphone.png",
        name: "Headphones",
        sku: "33KR5689B1",
        category: "Smart Headphones",
        price: 10000.0,
        quantity: 5,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "other-images/cart-img.jpg",
        name: "Wood chairs",
        sku: "568GH3LLQ2",
        category: "Furniture",
        price: 78000.0,
        quantity: 50,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/watch.png",
        name: "Smart watch",
        sku: "58FR7K34F6",
        category: "Electric",
        price: 25000.0,
        quantity: 48,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/phone.png",
        name: "Apple iphone 13 Pro",
        sku: "56379FG3AW",
        category: "Smart Phones",
        price: 19000.0,
        quantity: 48,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/headphone.png",
        name: "Headphones",
        sku: "33KR5689B1",
        category: "Smart Headphones",
        price: 10000.0,
        quantity: 5,
        status: "In Stock",
        rating: 3,
    },
    {
        image: "product_list/product-categories/wireless-headphone.png",
        name: "Wireless-headphone",
        sku: "AD6789HEY0",
        category: "Smart Headphones",
        price: 15000.0,
        quantity: 4,
        status: "Sold Out",
        rating: 5,
    },
    {
        image: "product_list/product-categories/1.png",
        name: "Wood Chair",
        sku: "456DF78DFQ",
        category: "Furniture",
        price: 99000.0,
        quantity: 2,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "email-template/3.png",
        name: "Wood Chair",
        sku: "5633GD3K54",
        category: "Furniture",
        price: 1000.0,
        quantity: 8,
        status: "Sold Out",
        rating: 3,
    },
    {
        image: "product_list/product-categories/laptop.png",
        name: "Apple Desktop 2023",
        sku: "02145YK796",
        category: "Laptops",
        price: 56000.0,
        quantity: 13,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/phone.png",
        name: "Apple iphone 13 Pro",
        sku: "56379FG3AW",
        category: "Smart Phones",
        price: 19000.0,
        quantity: 48,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/headphone.png",
        name: "Headphones",
        sku: "33KR5689B1",
        category: "Smart Headphones",
        price: 10000.0,
        quantity: 5,
        status: "In Stock",
        rating: 5,
    },
    {
        image: "product_list/product-categories/wireless-headphone.png",
        name: "Wireless-headphone",
        sku: "AD6789HEY0",
        category: "Smart Headphones",
        price: 15000.0,
        quantity: 4,
        status: "Sold Out",
        rating: 4,
    },
    {
        image: "product_list/product-categories/1.png",
        name: "Wood Chair",
        sku: "456DF78DFQ",
        category: "Furniture",
        price: 99000.0,
        quantity: 2,
        status: "Sold Out",
        rating: 2,
    },
];

const ProductListTableAction = () => {

    return (
        <div className="product-action">
            <Link href={`/ecommerce/add_product`}>
                <SVG iconId="edit-content" />
            </Link>
            <SVG iconId="trash1" />
        </div>
    );
};

const ProductListTableProductName: React.FC<{images: string, name: string}> = ({ images, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${images}`} alt="laptop" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProductListTableStatus: React.FC<{name: string}> = ({ name }) => {
    return (
        <Badge color="" className={`badge-light-${name === "Sold Out" ? "secondary" : "primary"}`}>
            {name}
        </Badge>
    );
};

const ProductListTableRating: React.FC<{rate: any}> = ({ rate }) => {
    return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};

export const ProductListTableDataColumn = [
    {
        name: "Product Name",
        cell: (row: any) => <ProductListTableProductName images={row.image} name={row.name} />,
        sortable: true,
        grow: 2,
    },
    {
        name: "SKU",
        selector: (row: any) => `${row.sku}`,
        sortable: true,
    },
    {
        name: "Category",
        selector: (row: any) => `${row.category}`,
        sortable: true,
    },
    {
        name: "Price",
        selector: (row: any) => `${row.price}`,
        sortable: true,
    },
    {
        name: "Qty",
        selector: (row: any) => `${row.quantity}`,
        sortable: true,
    },
    {
        name: "Status",
        cell: (row: any) => <ProductListTableStatus name={row.status} />,
    },
    {
        name: "Rating",
        cell: (row: any) => <ProductListTableRating rate={row.rating} />,
    },
    {
        name: "Action",
        cell: () => <ProductListTableAction />,
    },
];

