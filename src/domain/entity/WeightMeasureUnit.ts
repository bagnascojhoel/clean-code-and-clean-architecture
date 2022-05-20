const WeightMeasureUnit = {
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

export type WeightMeasureUnit = typeof WeightMeasureUnit[keyof typeof WeightMeasureUnit];

export default WeightMeasureUnit;
