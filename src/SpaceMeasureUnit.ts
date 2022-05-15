import SpaceMeasure from "./SpaceMeasure";

export const SingleDimensionalSpace = {
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
    }
} as const;

export const BiDimensionalSpace = {
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

export const TriDimensionalSpace = {
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
    typeof SingleDimensionalSpace[keyof typeof SingleDimensionalSpace]
    | typeof BiDimensionalSpace[keyof typeof BiDimensionalSpace]
    | typeof TriDimensionalSpace[keyof typeof TriDimensionalSpace];

export type SpaceMeasureUnitType = typeof SingleDimensionalSpace | typeof BiDimensionalSpace | typeof TriDimensionalSpace
