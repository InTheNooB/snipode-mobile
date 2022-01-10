import { StyleSheet, View } from 'react-native';
import CodeSnippetContainer from './components/CodeSnippetContainer';

const SERVER = {
  IP: "10.7.26.193",
  PORT: "3001"
}

export default function App() {

  return (
    <View style={styles.container}>
      <CodeSnippetContainer serverIP={SERVER.IP} port={SERVER.PORT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
