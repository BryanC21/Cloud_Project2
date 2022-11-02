import React, { Component } from 'react';
import img1 from "../../assets/img/fried_chicken.webp";
import img2 from "../../assets/img/burger.jfif";

const tables = [
    {
        id: 1,
        name: 'Table 1',
        capacity: 5,
        status: 'available',
        guest_n: 0,
        order: [
            {
                "id": 1,
                "dish_id": 1,
                "name": 'Fried Chicken',
                "price": 5,
                "description": "This is a fried chicken",
                "quantity": 1,
                "status": 'Cooking',
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
                        ],
                        "answer": 1,
                    }
                ],
            },
            {
                "id": 2,
                "dish_id": 2,
                "name": 'Burger',
                "price": 8,
                "description": "This is a burger",
                "quantity": 2,
                "status": 'Completed',
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
                        ],
                        "answer": 4,
                    }
                ],
            },

        ],
    },
    {
        id: 2,
        name: 'Table 2',
        capacity: 2,
        status: 'reserved',
        guest_n: 1,
        order: [
            {
                "id": 1,
                "dish_id": 1,
                "name": 'Fried Chicken',
                "price": 5,
                "description": "This is a fried chicken",
                "quantity": 1,
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
                        ],
                        "answer": 1,
                    }
                ],
            },
            {
                "id": 2,
                "dish_id": 2,
                "name": 'Burger',
                "price": 8,
                "description": "This is a burger",
                "quantity": 2,
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
                        ],
                        "answer": 4,
                    }
                ],
            },
        ],
    },
    {
        id: 2,
        name: 'Table 3',
        capacity: 4,
        status: 'occupied',
        guest_n: 4,
        order: []
    },
]

export default tables;