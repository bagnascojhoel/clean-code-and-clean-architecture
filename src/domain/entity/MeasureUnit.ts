export const Weight = {
    MG: {
        conversionFactor: '0.001'
    },
    G: {
        conversionFactor: '1'
    },
    KG: {
        conversionFactor: '1000'
    },
    T: {
        conversionFactor: '1000000'
    },
} as const;

export const Distance = {
    MM: {
        key: 'MM',
        conversionFactor: '0.001',
    },
    CM: {
        key: 'CM',
        conversionFactor: '0.01',
    },
    M: {
        key: 'M',
        conversionFactor: '1',
    },
    KM: {
        key: 'KM',
        conversionFactor: '1000',
    }
} as const;

export const Area = {
    MM2: {
        key: 'MM2',
        conversionFactor: '0.000001',
    },
    CM2: {
        key: 'CM2',
        conversionFactor: '0.0001',
    },
    M2: {
        key: 'M2',
        conversionFactor: '1',
    },
} as const;

export const Volume = {
    MM3: {
        key: 'MM3',
        conversionFactor: '0.000000001',
    },
    CM3: {
        key: 'CM3',
        conversionFactor: '0.000001',
    },
    M3: {
        key: 'M3',
        conversionFactor: '1',
    },
} as const;

export type SpaceMeasureUnit =
    typeof Distance[keyof typeof Distance]
    | typeof Area[keyof typeof Area]
    | typeof Volume[keyof typeof Volume];

export type SpaceMeasureUnitType = typeof Distance | typeof Area | typeof Volume

export type WeightMeasureUnit = typeof Weight[keyof typeof Weight]
