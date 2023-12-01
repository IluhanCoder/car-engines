import Detail from "../types/detail-type";

const DetailsList: Detail[] = [
    {
        name: "двигун внутрішнього згорання",
        hoursUsed: 0,
        rpm: 10000,
        durability: 10000,
        workCoef: 100,
        isWorkedOut: false,
        allowedChildren: [
            {
                name: "поршень",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
                allowedChildren: [{
                    name: "поршневі кільця",
                    hoursUsed: 0,
                    durability: 10000,
                    workCoef: 100,
                    isWorkedOut: false
                },
                {
                    name: "поршневий палець",
                    hoursUsed: 0,
                    durability: 10000,
                    workCoef: 100,
                    isWorkedOut: false
                },
                {
                    name: "шатун поршня",
                    hoursUsed: 0,
                    durability: 10000,
                    workCoef: 100,
                    isWorkedOut: false
                }]
            }, 
            {
                name: "колінвал" ,
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "автомобільне масло",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "циліндр" ,
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "маховик",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "кривошип",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "роздільний вал",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
                allowedChildren: [{
                    name: "кулачок роздільного валу",
                    hoursUsed: 0,
                    durability: 10000,
                    workCoef: 100,
                    isWorkedOut: false
                }]
            },
            {
                name: "важіль",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "клапан",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "свічка запалювання",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "акамулятор",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                voltage: 12,
                maxVoltage: 15,
                isWorkedOut: false,
            },
            {
                name: "ремінь ГРМ",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "коробка передач",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
                allowedChildren: [
                    {
                        name: "вал первинного призначення",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false
                    },
                    {
                        name: "важіль зміни передач",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false
                    },
                    {
                        name: "вали вторинного призначення",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false
                    },
                    {
                        name: "картер",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false
                    }
                ]
            },
            {
                name: "зчеплення",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "кардан",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
                allowedChildren: [
                    {
                        name: "карданні шарніри",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "головний пал",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "проміжна опора",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "проміжний вал",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "вилки",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "хрестовина",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    }
                ]
            },
            {
                name: "ведучий міст",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "роздавальна коробка",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
        ]
    },
    {
        name: "електродвигун",
        hoursUsed: 0,
        rpm: 10000,
        durability: 10000,
        workCoef: 100,
        voltage: 800,
        maxVoltage: 1000,
        isWorkedOut: false,
        allowedChildren: [
            {
                name: "автомобільне масло",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false
            },
            {
                name: "акамулятор",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
                voltage: 12,
                maxVoltage: 15
            },
            {
                name: "кардан",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
                allowedChildren: [
                    {
                        name: "карданні шарніри",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "головний пал",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "проміжна опора",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "проміжний вал",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "вилки",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    },
                    {
                        name: "хрестовина",
                        hoursUsed: 0,
                        durability: 10000,
                        workCoef: 100,
                        isWorkedOut: false,
                    }
                ]
            },
            {
                name: "ведучий міст",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "роздавальна коробка",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "якор",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "серцевик полюса",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "обмотка полюса",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "статор",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "вентилятор",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "щітки",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
            {
                name: "колектор",
                hoursUsed: 0,
                durability: 10000,
                workCoef: 100,
                isWorkedOut: false,
            },
        ]
    },
]

export default DetailsList;