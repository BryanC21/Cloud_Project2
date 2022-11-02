import img1 from "../../assets/img/fried_chicken.webp";
import img2 from "../../assets/img/burger.jfif";

const categories = [
    {
        id: 1,
        name: 'Featured',
        menu: [
            {
                "name": 'Fried Chicken',
                "price": 5,
                "description": "This is a fried chicken",
                "img": img1,
                "extra": [
                    {
                        "name": 'Spicy',
                        "type": 'Select',
                        "options": [
                            {
                                "id": 1,
                                "name": "No Spicy",
                            },
                            {
                                "id": 2,
                                "name": "Mild",
                            },
                            {
                                "id": 3,
                                "name": "Medium",
                            },
                            {
                                "id": 4,
                                "name": "Hot",
                            },
                        ]
                    }
                ],
            },
            {
                "name": 'Burger',
                "price": 10,
                "description": "This is a burger",
                "img": img2,
                "extra": [
                    {
                        "name": 'Spicy',
                        "type": 'Select',
                        "options": [
                            {
                                "id": 1,
                                "name": "No Spicy",
                            },
                            {
                                "id": 2,
                                "name": "Mild",
                            },
                            {
                                "id": 3,
                                "name": "Medium",
                            },
                            {
                                "id": 4,
                                "name": "Hot",
                            },
                        ]
                    }
                ],
            }
        ],
    },
    {
        id: 2,
        name: 'Burgers',
        menu: [
            {
                "name": 'Fried Chicken',
                "price": 5,
                "description": "This is a fried chicken",
                "img": img1,
                "extra": [],
            },
            {
                "name": 'Burger',
                "price": 10,
                "description": "This is a burger",
                "img": img2,
                "extra": [],
            },
        ],
    },
    {
        id: 3,
        name: 'Sides',
        menu: [
            {
                "name": 'Fried Chicken',
                "price": 5,
                "description": "This is a fried chicken",
                "img": img1,
                "extra": [],
            },
            {
                "name": 'Burger',
                "price": 10,
                "description": "This is a burger",
                "img": img2,
                "extra": [],
            },
        ],
    },
    {
        id: 4,
        name: 'Drinks',
        menu: [
            {
                "name": 'Fried Chicken',
                "price": 5,
                "description": "This is a fried chicken",
                "img": img1,
                "extra": [],
            },
            {
                "name": 'Burger',
                "price": 10,
                "description": "This is a burger",
                "img": img2,
                "extra": [],
            },
        ],
    },
]

export default categories;