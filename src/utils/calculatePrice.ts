export const calculatePrice = (formValues: FormValues) => {
    const { height, width, colors, isOriginal, complexity } = formValues;
    const areaPrice =
        height * width * Number(process.env.NEXT_PUBLIC_BASE_CM2_PRICE);
    const colorsPrice =
        colors <= 1
            ? 0
            : colors * Number(process.env.NEXT_PUBLIC_PRICE_PER_COLOR);
    const mappedComplexity = {
        easy: Number(process.env.NEXT_PUBLIC_EASY_COMPLEXITY_MULTIPLIER),
        medium: Number(process.env.NEXT_PUBLIC_MEDIUM_COMPLEXITY_MULTIPLIER),
        hard: Number(process.env.NEXT_PUBLIC_HARD_COMPLEXITY_MULTIPLIER)
    };
    const priceBeforeOriginality =
        (areaPrice + colorsPrice) * Number(mappedComplexity[complexity]);
    return isOriginal
        ? priceBeforeOriginality *
              Number(process.env.NEXT_PUBLIC_ORIGINALITY_MULTIPLIER)
        : priceBeforeOriginality;
};
