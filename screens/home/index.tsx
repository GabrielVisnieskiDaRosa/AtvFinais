import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useState } from "react";

export default function Home() {
  const [pontos, setPontos] = useState(0);
  const [certas, setCertas] = useState(0);
  const [erradas, setErradas] = useState(0);
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operador, setOperador] = useState(0);
  const [resultado, setResultado] = useState("");
  const [operadorSelecionado, setOperadorSelecionado] = useState("");

  const gerarNumeroAleatorio = (
    limiteInferior: number,
    limiteSuperior: number
  ) => {
    return (
      Math.floor(Math.random() * (limiteSuperior - limiteInferior)) +
      limiteInferior
    );
  };

  const buscarOperador = (numeroAleatorio: number) => {
    return operadores.find((item) => item.id === numeroAleatorio);
  };

  function handleRandom() {
    setNum(Math.floor(Math.random() * 100) + 1);
    setNum2(Math.floor(Math.random() * 100) + 1);

    const numeroAleatorio = gerarNumeroAleatorio(1, 5);
    const item = buscarOperador(numeroAleatorio);

    if (item) {
      setOperadorSelecionado(item.texto);
    } else {
      setOperadorSelecionado("");
    }
  }

  const operadores = [
    { id: 1, texto: "+" },
    { id: 2, texto: "-" },
    { id: 3, texto: "/" },
    { id: 4, texto: "x" },
  ];

  function handleVerifica() {
    let resultadoCorreto = null;

    if (operadorSelecionado === "+") {
      resultadoCorreto = num + num2;
    } else if (operadorSelecionado === "-") {
      resultadoCorreto = num - num2;
    } else if (operadorSelecionado === "/") {
      resultadoCorreto = num / num2;
    } else if (operadorSelecionado === "x") {
      resultadoCorreto = num * num2;
    }

    if (resultadoCorreto !== null) {
      const respostaUsuario = parseFloat(resultado);

      if (respostaUsuario === resultadoCorreto) {
        // Resposta correta
        setPontos(pontos + 10);
        setCertas(certas + 1);
        Alert.alert(
          "Você acertou",
          "Deseja uma nova conta?",
          [
            {
              text: "Cancelar",
              onPress: () => handleRandom(),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressionado"),
            },
          ],
          { cancelable: false }
        );
      } else {
        // Resposta incorreta
        setErradas(erradas + 1);
        setPontos(pontos - 5);
        Alert.alert(
          "Você errou",
          "Deseja uma nova conta?",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancelar Pressionado"),
              style: "cancel",
            },
            {
              text: "Sim",
              onPress: () => handleRandom(),
            },
          ],
          { cancelable: false }
        );
      }
    }
  }

  function handleZerar() {
    setPontos(0),
      setCertas(0),
      setErradas(0),
      setNum(0),
      setNum2(0),
      setOperador(0),
      setResultado(""),
      setOperadorSelecionado("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Você tem {pontos} pontos</Text>
      <View style={styles.container2}>
        <Text style={styles.textSubTittle}>Certas {certas}</Text>
        <Text style={styles.textSubTittle2}>Erradas {erradas}</Text>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.button} onPress={handleRandom}>
          <Text style={styles.textButton}>Sortear Desafio</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container4}>
        <Text style={styles.text1}>Quanto é:</Text>
        <View style={styles.subContainer}>
          <Text style={styles.num1}>{num}</Text>
          <Text style={styles.num1}>{operadorSelecionado}</Text>
          <Text style={styles.num1}>{num2}</Text>
        </View>
      </View>
      <View style={styles.container4}>
        <Text style={styles.text1}>Informe sua resposta</Text>
        <TextInput style={styles.input} onChangeText={setResultado} />
      </View>
      <View style={styles.container4}>
        <TouchableOpacity style={styles.button2} onPress={handleVerifica}>
          <Text style={styles.textButton}>Validar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container5}>
        <TouchableOpacity style={styles.button3} onPress={handleZerar}>
          <Text style={styles.textButton}>Novo jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
