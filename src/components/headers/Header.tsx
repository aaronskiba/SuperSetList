import {StyleSheet, Text, View, Image} from 'react-native';

type HeaderProps = {
  title: string;
  imageUris: Array<string | null>;
};

export default function Header({title, imageUris}: HeaderProps) {
  const validUris = imageUris
    .map(uri => uri?.trim())
    .filter((uri): uri is string => !!uri);
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        {validUris.map((uri, index) => (
          <View style={styles.column} key={index}>
            <Image source={{uri: uri}} style={styles.image} />
          </View>
        ))}
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {alignItems: 'center'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});
