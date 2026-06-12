import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

const API_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000') + '/prever';

export default function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [hemoglobin, setHemoglobin] = useState('');
  const [wbc, setWbc] = useState('');
  const [differential, setDifferential] = useState('');
  const [rbc, setRbc] = useState('');
  const [platelet, setPlatelet] = useState('');
  const [pdw, setPdw] = useState('');

  const [resultado, setResultado] = useState('');

  const ehInteiro = (v) => /^\d+$/.test(v);
  const ehDecimal = (v) => /^\d+([.,]\d+)?$/.test(v);


  function limpar() {
    setAge('');
    setGender('');
    setHemoglobin('');
    setWbc('');
    setDifferential('');
    setRbc('');
    setPlatelet('');
    setPdw('');
    setResultado('');
  }

  async function analisar() {
    // Validacao basica com regex
    if (!ehInteiro(age)) return setResultado('Idade invalida.');
    if (gender !== 'Male' && gender !== 'Female' && gender !== 'Child') return setResultado('Selecione o genero.');
    if (!ehDecimal(hemoglobin)) return setResultado('Hemoglobina invalida.');
    if (!ehInteiro(wbc)) return setResultado('Leucocitos invalido.');
    if (differential !== '0' && differential !== '1') return setResultado('Differential deve ser 0 ou 1.');
    if (rbc !== '0' && rbc !== '1') return setResultado('RBC deve ser 0 ou 1.');
    if (!ehInteiro(platelet)) return setResultado('Plaquetas invalido.');
    if (!ehDecimal(pdw)) return setResultado('PDW invalido.');

    setResultado('Analisando...');

    const dados = {
      age: parseInt(age),
      gender: gender,
      hemoglobin_g_dl: parseFloat(hemoglobin.replace(',', '.')),
      wbc_count: parseInt(wbc),
      differential_count: parseInt(differential),
      rbc_count: parseInt(rbc),
      platelet_count: parseInt(platelet),
      platelet_distribution_width: parseFloat(pdw.replace(',', '.')),
    };

    try {
      const resp = await axios.post(API_URL, dados);
      const json = resp.data;
      const prob = (json.probabilidade * 100).toFixed(1);
      if (json.dengue) {
        setResultado('SUSPEITA DE DENGUE (' + prob + '%)');
      } else {
        setResultado('BAIXA SUSPEITA (' + prob + '%)');
      }
    } catch (e) {
      setResultado('Erro ao conectar na API.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Triagem de Dengue</Text>

      <Text style={styles.label}>Idade</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

      <Text style={styles.label}>Genero</Text>
      <View style={styles.linha}>
        <TouchableOpacity style={[styles.opcao, gender === 'Male' && styles.ativo]} onPress={() => setGender('Male')}>
          <Text style={[styles.opcaoTexto, gender === 'Male' && styles.ativoTexto]}>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.opcao, gender === 'Female' && styles.ativo]} onPress={() => setGender('Female')}>
          <Text style={[styles.opcaoTexto, gender === 'Female' && styles.ativoTexto]}>Feminino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.opcao, gender === 'Child' && styles.ativo]} onPress={() => setGender('Child')}>
          <Text style={[styles.opcaoTexto, gender === 'Child' && styles.ativoTexto]}>Crianca</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Hemoglobina (g/dL)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={hemoglobin} onChangeText={setHemoglobin} />

      <Text style={styles.label}>Leucocitos (WBC)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={wbc} onChangeText={setWbc} />

      <Text style={styles.label}>Differential count (0 ou 1)</Text>
      <View style={styles.linha}>
        <TouchableOpacity style={[styles.opcao, differential === '0' && styles.ativo]} onPress={() => setDifferential('0')}>
          <Text style={[styles.opcaoTexto, differential === '0' && styles.ativoTexto]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.opcao, differential === '1' && styles.ativo]} onPress={() => setDifferential('1')}>
          <Text style={[styles.opcaoTexto, differential === '1' && styles.ativoTexto]}>1</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Hemacias - RBC (0 ou 1)</Text>
      <View style={styles.linha}>
        <TouchableOpacity style={[styles.opcao, rbc === '0' && styles.ativo]} onPress={() => setRbc('0')}>
          <Text style={[styles.opcaoTexto, rbc === '0' && styles.ativoTexto]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.opcao, rbc === '1' && styles.ativo]} onPress={() => setRbc('1')}>
          <Text style={[styles.opcaoTexto, rbc === '1' && styles.ativoTexto]}>1</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Plaquetas</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={platelet} onChangeText={setPlatelet} />

      <Text style={styles.label}>PDW</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={pdw} onChangeText={setPdw} />

      <TouchableOpacity style={styles.botao} onPress={analisar}>
        <Text style={styles.botaoTexto}>Analisar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
        <Text style={styles.botaoLimparTexto}>Nova medicao</Text>
      </TouchableOpacity>

      {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}

      <Text style={styles.aviso}>Triagem preliminar. Nao substitui avaliacao medica.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  conteudo: { padding: 24, paddingTop: 64, paddingBottom: 48 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#000', marginBottom: 16 },
  label: { fontSize: 14, color: '#000', marginTop: 14, marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#000', borderRadius: 8, padding: 12, fontSize: 16, color: '#000' },
  linha: { flexDirection: 'row', gap: 8 },
  opcao: { flex: 1, borderWidth: 1, borderColor: '#000', borderRadius: 8, padding: 12, alignItems: 'center' },
  opcaoTexto: { color: '#000', fontWeight: '600' },
  ativo: { backgroundColor: '#000' },
  ativoTexto: { color: '#fff' },
  botao: { backgroundColor: '#000', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 24 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoLimpar: { borderWidth: 1, borderColor: '#000', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 10 },
  botaoLimparTexto: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  resultado: { fontSize: 18, fontWeight: 'bold', color: '#000', textAlign: 'center', marginTop: 20 },
  aviso: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 24 },
});
