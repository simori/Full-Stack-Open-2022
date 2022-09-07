// tekstikomponentti jonka avulla voi näyttää erityylisiä tekstejä
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  appBarTitleWhite: {
    color: theme.colors.appBarTitleWhite,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  extraPadding: {
    paddingRight: 20,
  },
});

const Text = ({ color, fontSize, fontWeight, style, padding, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'appBarTitle' && styles.appBarTitleWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    padding === 'extraPad' && styles.extraPadding,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;