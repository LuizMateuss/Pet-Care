import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

export function MaskedInput({
  mask,
  type,
  options,
  onChangeText,
  style,
  placeholder,
  ...rest
}) {
  return (
    <MaskedTextInput
      type={type}
      mask={mask}
      options={options}
      onChangeText={onChangeText}
      style={style}
      placeholder={placeholder}
      {...rest}
    />
  );
}
