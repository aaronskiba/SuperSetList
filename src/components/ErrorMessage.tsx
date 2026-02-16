import {View, Text, StyleSheet} from 'react-native';

type ErrorMessageProps = {
  error: Error | null;
};

export default function ErrorMessage({error}: ErrorMessageProps) {
  if (!error) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fdecea', // light red
    borderRadius: 4,
    marginVertical: 4,
  },
  text: {
    color: '#b00020', // dark red
    fontSize: 14,
  },
});
