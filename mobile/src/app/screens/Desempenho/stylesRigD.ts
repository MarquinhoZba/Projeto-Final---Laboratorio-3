import { StyleSheet } from 'react-native';

export const stylesRigD = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB', // Fundo levemente mais claro para destacar o card
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },

  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20, // Cantos um pouco mais arredondados
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },

  formGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase', // Estilo profissional de formulário
    letterSpacing: 0.5,
  },

  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E6E9EB', // Bordas mais suaves
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#1A1A1A',
  },

  btnArea: {
    flexDirection: 'column', // Mudança estratégica para botões empilhados em telas menores
    gap: 12,
    marginTop: 20,
  },

  btnSalvar: {
    backgroundColor: '#1D9E75', // Verde padrão do SistemaPEE
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#1D9E75',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  btnCancelar: {
    backgroundColor: 'transparent', // Botão de cancelar mais discreto
    paddingVertical: 12,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});