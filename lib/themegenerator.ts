import {
    BaseSlots,
    createTheme,
    getColorFromString,
    isDark,
    Theme,
    ThemeGenerator,
    themeRulesStandardCreator,
} from "@fluentui/react";

const generateTheme = (
    primaryColor: string,
    textColor: string,
    backgroundColor: string
): Theme => {
    const themeRules = themeRulesStandardCreator();
    const colors = {
        pColor: getColorFromString(primaryColor)!,
        tColor: getColorFromString(textColor)!,
        bColor: getColorFromString(backgroundColor)!,
    };

    const currentIsDark = isDark(
        themeRules[BaseSlots[BaseSlots.backgroundColor]].color!
    );

    ThemeGenerator.insureSlots(themeRules, currentIsDark);
    ThemeGenerator.setSlot(
        themeRules[BaseSlots[BaseSlots.primaryColor]],
        colors.pColor,
        currentIsDark,
        true,
        true
    );
    ThemeGenerator.setSlot(
        themeRules[BaseSlots[BaseSlots.foregroundColor]],
        colors.tColor,
        currentIsDark,
        true,
        true
    );
    ThemeGenerator.setSlot(
        themeRules[BaseSlots[BaseSlots.backgroundColor]],
        colors.bColor,
        currentIsDark,
        true,
        true
    );

    const themeAsJson: {
        [key: string]: string;
    } = ThemeGenerator.getThemeAsJson(themeRules);

    const finalTheme = createTheme({
        ...{ palette: themeAsJson },
        isInverted: currentIsDark,
    });

    return finalTheme;
};

export default generateTheme;