import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorText: {
    borderWidth: 3,
    borderColor: "#d73a4a",
    fontWeight: "bold"
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  if (error) return <NativeTextInput style={styles.errorText} {...props} />;
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;