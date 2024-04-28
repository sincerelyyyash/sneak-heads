import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3, notFoundImage } from "../assets/images";


export const baseUrl = 'http://localhost:8000/api/v1'

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '120k+', label: 'Orders' },
    { value: '50k+', label: 'Customers' },
    { value: '100%', label: 'Satisfaction' },
];


export const services = [
    {
        imgURLs: [truckFast], 
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURLs: [shieldTick], 
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURLs: [support], 
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1, 
        customerName: 'John Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2, 
        customerName: 'Jennifer',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "NIKE Mens Court Royale 2", link: "/products/66072b9c2514675e27d82245" },
            { name: "Nike Dunk Low Retro Premium", link: "/products/66072c302514675e27d82249" },
            { name: "Nike Dunk Low Retro", link: "/products/66072cf52514675e27d8224d" },
            { name: "Nike Air Dunk Jumbo", link: "/products/66072d922514675e27d82251" },
            { name: "Nike Dunk High Retro SE1", link: "/products/66072e222514675e27d82255" },
            { name: "Nike Dunk Low", link: "/products/66072f852514675e27d82261" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@sneakhead.com", link: "mailto:customer@sneakhead.com" },
            { name: "+91-29291919191", link: "tel:+92111111111" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo", link: 'https://twitter.com/sincerelyyyash' },
    { src: twitter, alt: "twitter logo", link: 'https://twitter.com/sincerelyyyash' },
    { src: instagram, alt: "instagram logo", link: 'https://twitter.com/sincerelyyyash' },
];
export default notFoundImage;