import Detail from "../types/detail-type";

const DetailsList: Detail[] = [
    {
        name: "двигун внутрішнього згорання",
        hoursUsed: 0,
        rpm: 10000,
        durability: 10000,
        allowedChildren: [
            {
                name: "поршень",
                hoursUsed: 0,
                durability: 10000,
                allowedChildren: [{
                    name: "поршневі кільця",
                    hoursUsed: 0,
                    durability: 10000
                },
                {
                    name: "поршневий палець",
                    hoursUsed: 0,
                    durability: 10000
                },
                {
                    name: "шатун поршня",
                    hoursUsed: 0,
                    durability: 10000
                }]
            }, 
            {
                name: "колінвал" ,
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "циліндр" ,
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "маховик",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "кривошип",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "роздільний вал",
                hoursUsed: 0,
                durability: 10000,
                allowedChildren: [{
                    name: "кулачок роздільного валу",
                    hoursUsed: 0,
                    durability: 10000
                }]
            },
            {
                name: "важіль",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "клапан",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "свічка запалювання",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "акамулятор",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "ремінь ГРМ",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "коробка передач",
                hoursUsed: 0,
                durability: 10000,
                allowedChildren: [
                    {
                        name: "вал первинного призначення",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "важіль зміни передач",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "вали вторинного призначення",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "картер",
                        hoursUsed: 0,
                        durability: 10000,
                    }
                ]
            },
            {
                name: "зчеплення",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "кардан",
                hoursUsed: 0,
                durability: 10000,
                allowedChildren: [
                    {
                        name: "карданні шарніри",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "головний пал",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "проміжна опора",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "проміжний вал",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "вилки",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "хрестовина",
                        hoursUsed: 0,
                        durability: 10000,
                    }
                ]
            },
            {
                name: "ведучий міст",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "роздавальна коробка",
                hoursUsed: 0,
                durability: 10000
            },
        ]
    },
    {
        name: "електродвигун",
        hoursUsed: 0,
        rpm: 10000,
        durability: 10000,
        allowedChildren: [
            {
                name: "акамулятор",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "кардан",
                hoursUsed: 0,
                durability: 10000,
                allowedChildren: [
                    {
                        name: "карданні шарніри",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "головний пал",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "проміжна опора",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "проміжний вал",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "вилки",
                        hoursUsed: 0,
                        durability: 10000,
                    },
                    {
                        name: "хрестовина",
                        hoursUsed: 0,
                        durability: 10000,
                    }
                ]
            },
            {
                name: "ведучий міст",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "роздавальна коробка",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "якор",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "серцевик полюса",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "обмотка полюса",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "статор",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "вентилятор",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "щітки",
                hoursUsed: 0,
                durability: 10000
            },
            {
                name: "колектор",
                hoursUsed: 0,
                durability: 10000
            },
        ]
    },
]

export default DetailsList;