import {StyleSheet, Text, View, Image} from 'react-native';

type HeaderProps = {
  title: string;
  images: string[];
};

export default function Header({title, images}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        {images.map((image, index) => (
          <View style={styles.column} key={index}>
            <Image source={{uri: image}} style={styles.image} />
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
